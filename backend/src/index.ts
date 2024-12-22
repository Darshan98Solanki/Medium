import { Hono } from 'hono'
import { UserRouter } from './routes/user'
import { BlogsRouter } from './routes/blogs'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>

app.use("/*", cors())
app.route('/api/v1/user', UserRouter)
app.route('/api/v1/blogs', BlogsRouter)

export default app
