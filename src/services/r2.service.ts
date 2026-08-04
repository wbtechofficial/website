import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { env } from '../config/env.js';
import { r2Client } from '../config/r2.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../utils/constants.js';

const BUCKET = env.R2_BUCKET_NAME;
const PUBLIC_BASE_URL = env.R2_PUBLIC_BASE_URL.replace(/\/+$/, '');

const MIME_TO_EXTENSION: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export interface StoredAsset {
  key: string;
  url: string;
  contentType: string;
}

function generateObjectKey(contentType: string): string {
  const extension = MIME_TO_EXTENSION[contentType] ?? 'bin';
  return `thumbnails/${Date.now()}-${randomUUID()}.${extension}`;
}

export async function uploadThumbnail(buffer: Buffer, contentType: string): Promise<StoredAsset> {
  const key = generateObjectKey(contentType);

  try {
    await r2Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
  } catch (error) {
    console.error('[r2] Upload failed', error);
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to upload thumbnail');
  }

  return {
    key,
    url: `${PUBLIC_BASE_URL}/${key}`,
    contentType,
  };
}

export async function deleteThumbnail(key: string): Promise<void> {
  try {
    await r2Client.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      }),
    );
  } catch (error) {
    console.error('[r2] Delete failed', error);
    throw new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to remove thumbnail');
  }
}
