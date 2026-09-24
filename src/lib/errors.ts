import type { Request, Response, NextFunction } from 'express';
export class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
const status = err instanceof HttpError ? err.status : 500;
res.status(status).json({ error: err instanceof Error ? err.message : 'Unknown error' });
}
// in app.ts, AFTER all routes: app.use(errorMiddleware);