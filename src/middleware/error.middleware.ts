import type { ErrorRequestHandler, RequestHandler } from 'express';
import multer from 'multer';
import { ApiError } from '../utils/ApiError.js';
import { ALLOWED_IMAGE_MIME_TYPES, HTTP_STATUS, MAX_THUMBNAIL_SIZE_BYTES } from '../utils/constants.js';

export const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.details !== undefined ? { details: error.details } : {}),
    });
    return;
  }

  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE' ? 'Thumbnail exceeds the 5MB size limit' : error.message;
    res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message });
    return;
  }

  if (error && (error as { type?: string }).type === 'entity.parse.failed') {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ success: false, message: 'Malformed request body' });
    return;
  }

  console.error('[error] Unhandled error', error);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Internal server error',
  });
};

export const notFoundMiddleware: RequestHandler = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

export const unknownImageTypeGuard: RequestHandler = (_req, _res, next) => {
  next(new ApiError(HTTP_STATUS.BAD_REQUEST, `Unsupported file type. Allowed: ${ALLOWED_IMAGE_MIME_TYPES.join(', ')}`));
};

export const uploadThumbnail = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_THUMBNAIL_SIZE_BYTES,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype as (typeof ALLOWED_IMAGE_MIME_TYPES)[number])) {
      callback(new ApiError(HTTP_STATUS.BAD_REQUEST, `Unsupported file type. Allowed: ${ALLOWED_IMAGE_MIME_TYPES.join(', ')}`));
      return;
    }
    callback(null, true);
  },
});
