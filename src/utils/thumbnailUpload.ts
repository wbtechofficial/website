import type { StoredAsset } from '../services/r2.service.js';
import { deleteThumbnail, uploadThumbnail } from '../services/r2.service.js';

export interface ThumbnailInput {
  buffer: Buffer;
  mimetype: string;
}

export async function withThumbnail<T>(file: ThumbnailInput, run: (asset: StoredAsset) => Promise<T>): Promise<T> {
  const asset = await uploadThumbnail(file.buffer, file.mimetype);
  try {
    return await run(asset);
  } catch (error) {
    await deleteThumbnail(asset.key).catch(() => undefined);
    throw error;
  }
}

export async function cleanupOrphanThumbnail(asset: StoredAsset): Promise<void> {
  await deleteThumbnail(asset.key).catch(() => undefined);
}
