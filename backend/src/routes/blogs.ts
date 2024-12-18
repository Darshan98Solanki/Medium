import { Hono } from 'hono'
import { verify } from 'hono/jwt'

export const BlogsRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>

BlogsRouter.use('/*', async (c, next) => {

    const auth = c.req.header().authorization

    if (!auth || !auth.startsWith('Bearer ')) {
        c.status(401)
        c.text("You are Unauthorized")
        return
    }

    const token = c.req.header().authorization.split(' ')[1]

    try {
        const user = await verify(token, c.env.JWT_SECRET)
        await next()
    } catch (e) {
        c.status(401)
        return c.text("You are Unauthorized")
    }
})

// create blog route
BlogsRouter.post('/blog', (c) => {
    return c.text('POST /')
})

// update blog route
BlogsRouter.put('/blog', (c) => {
    return c.text('POST /')
})

// get blog route
BlogsRouter.get('/blog/:id', (c) => {
    return c.text('GET /')
})

// get api for all blogs
BlogsRouter.get('/blog/bulk', (c) => {
    return c.text('GET /')
})