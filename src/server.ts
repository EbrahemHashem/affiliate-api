// src/server.ts — the entry point
import { app } from './app.js';
const port = 3000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));