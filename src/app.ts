import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { pinoHttp } from 'pino-http';
export const app = express();
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // the React dev server
app.use(cookieParser());
app.use(pinoHttp());
app.use(express.json());
// parses JSON bodies into req.body
app.get('/api/health', (_req, res) => res.json({ ok: true }));
