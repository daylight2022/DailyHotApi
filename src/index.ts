import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { config } from './config';
import app from '@/app';

const port = config.PORT;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
