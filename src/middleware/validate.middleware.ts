import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ZodTypeAny, ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../utils/constants.js';

type Source = 'body' | 'query' | 'params';

function flattenZodErrors(error: ZodError): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_';
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(issue.message);
  }
  return result;
}

export function validate(schema: ZodTypeAny, source: Source = 'body'): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[source]);
    if (!parsed.success) {
      next(new ApiError(HTTP_STATUS.BAD_REQUEST, 'Validation failed', flattenZodErrors(parsed.error)));
      return;
    }
    req[source] = parsed.data;
    next();
  };
}
