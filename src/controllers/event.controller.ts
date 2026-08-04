import type { Request, Response } from 'express';
import { createEvent, getActiveEvents, listEvents, updateEvent } from '../services/event.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../utils/constants.js';
import type { CreateEventInput, EventQuery } from '../schemas/showcase.schema.js';

export const listActiveEventsController = asyncHandler(async (_req: Request, res: Response) => {
  const events = await getActiveEvents();
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Active events fetched', { items: events }));
});

export const listAllEventsController = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as EventQuery;
  const result = await listEvents(query);
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Events fetched', result));
});

export const createEventController = asyncHandler(async (req: Request, res: Response) => {
  const input = req.body as CreateEventInput;
  const event = await createEvent(input);
  res.status(HTTP_STATUS.CREATED).json(new ApiResponse('Event created', event));
});

export const updateEventController = asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.params.id as string;
  const input = req.body as Partial<CreateEventInput>;
  const event = await updateEvent(eventId, input);
  res.status(HTTP_STATUS.OK).json(new ApiResponse('Event updated', event));
});
