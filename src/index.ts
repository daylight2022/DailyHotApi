import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from "./config";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = config.port
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
