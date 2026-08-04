import { Project } from '../models/Project.js';
import { Upvote } from '../models/Upvote.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../utils/constants.js';

export interface ToggleUpvoteResult {
  upvoted: boolean;
  upvoteCount: number;
}

export async function toggleUpvote(userId: string, projectId: string): Promise<ToggleUpvoteResult> {
  const project = await Project.findById(projectId).select('_id upvoteCount status');
  if (!project) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Project not found');
  }

  const existing = await Upvote.findOne({ user: userId, project: projectId });

  if (existing) {
    await existing.deleteOne();
    await Project.updateOne({ _id: projectId }, { $inc: { upvoteCount: -1 } });
    const updated = await Project.findById(projectId).select('upvoteCount').lean();
    return { upvoted: false, upvoteCount: updated?.upvoteCount ?? Math.max(project.upvoteCount - 1, 0) };
  }

  try {
    await Upvote.create({ user: userId, project: projectId });
  } catch (error) {
    if (!isDuplicateKeyError(error)) {
      throw error;
    }
  }

  await Project.updateOne({ _id: projectId }, { $inc: { upvoteCount: 1 } });
  const updated = await Project.findById(projectId).select('upvoteCount').lean();
  return { upvoted: true, upvoteCount: updated?.upvoteCount ?? project.upvoteCount + 1 };
}

export async function getUpvoteState(userId: string, projectIds: string[]): Promise<Record<string, boolean>> {
  const cleanIds = [...new Set(projectIds.filter(Boolean))];
  if (cleanIds.length === 0) {
    return {};
  }

  const upvotes = await Upvote.find({ user: userId, project: { $in: cleanIds } }).select('project').lean();

  return upvotes.reduce<Record<string, boolean>>((acc, upvote) => {
    acc[String(upvote.project)] = true;
    return acc;
  }, {});
}

function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as { code?: number }).code === 11000
  );
}
