import { model, Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';
import { PROJECT_SOURCE, PROJECT_STATUS } from '../utils/constants.js';

const thumbnailSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    demoUrl: {
      type: String,
      trim: true,
    },
    repoUrl: {
      type: String,
      trim: true,
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => value.length > 0 && value.length <= 10,
        message: 'Provide between 1 and 10 categories',
      },
    },
    techStack: {
      type: [String],
      required: true,
      validate: {
        validator: (value: string[]) => value.length > 0 && value.length <= 20,
        message: 'Provide between 1 and 20 tech stack entries',
      },
    },
    thumbnail: {
      type: thumbnailSchema,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    speakerEmail: {
      type: String,
      lowercase: true,
      trim: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    status: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: PROJECT_STATUS.PENDING,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    upvoteCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    referenceCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    source: {
      type: String,
      enum: Object.values(PROJECT_SOURCE),
      default: PROJECT_SOURCE.AUTHENTICATED,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type ProjectSchema = InferSchemaType<typeof projectSchema>;
export type ProjectDocument = HydratedDocument<ProjectSchema>;

projectSchema.index({ status: 1, featured: -1, upvoteCount: -1, createdAt: -1 });
projectSchema.index({ status: 1, event: 1, upvoteCount: -1 });
projectSchema.index({ status: 1, categories: 1 });
projectSchema.index({ status: 1, techStack: 1 });
projectSchema.index({ author: 1, createdAt: -1 });
projectSchema.index({ speakerEmail: 1, createdAt: -1 });

export const Project = model('Project', projectSchema);
