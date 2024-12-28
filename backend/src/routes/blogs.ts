import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { PostBolgSchema, UpdateBolgSchema } from '@darshan98solanki/medium-common'

export const BlogsRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: number
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
        if (user && typeof user.id === 'number') {
            c.set("userId", user.id)
            await next()
        }
    } catch (e) {
        c.status(401)
        return c.text("You are Unauthorized")
    }
})

// create blog route
BlogsRouter.post('/', async (c) => {

    const parseData = PostBolgSchema.safeParse(await c.req.json())
    const userId = c.get("userId")

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    if (!parseData.success) {
        c.status(411)
        return c.json(parseData.error.errors[0].message)
    }

    try {
        const blog = await prisma.blog.create({
            data: {
                title: parseData.data.title,
                content: parseData.data.content,
                authorId: userId
            }
        })
        c.status(200)
        return c.json({
            id: blog.id
        })

    } catch (e) {
        c.status(411)
        return c.text("Error while creating a new blog")
    } finally {
        // Clean up Prisma client to avoid connection leaks
        await prisma.$disconnect();
    }
})

BlogsRouter.delete("/:id", async (c) => {

    const id = parseInt(c.req.param().id)

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const removed = await prisma.blog.delete({
            where: {
                id: id
            }
        })

        if (removed) {
            c.status(200)
            return c.text("blog deleted")
        }

    } catch (e) {
        c.status(411)
        return c.text("Error while deleting the blog")
    } finally {
        // Clean up Prisma client to avoid connection leaks
        await prisma.$disconnect();
    }

})

// update blog route
BlogsRouter.put('/', async (c) => {

    const parseData = UpdateBolgSchema.safeParse(await c.req.json())
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    if (!parseData.success) {
        c.status(411)
        return c.json(parseData.error.errors[0].message)
    }

    try {
        const blog = await prisma.blog.update({
            where: {
                id: parseData.data.id,
            },
            data: {
                title: parseData.data.title,
                content: parseData.data.content
            }
        })
        c.status(200)
        return c.json({
            id: blog.id
        })
    } catch (e) {
        c.status(411)
        return c.text("Error while updating the blog")
    } finally {
        // Clean up Prisma client to avoid connection leaks
        await prisma.$disconnect();
    }
})



// get api for all blogs
// todo : add paginations for blogs
BlogsRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const filter = c.req.query("filter")
        const start = parseInt(c.req.query("start") || "0")
        const end = parseInt(c.req.query("end") || "10")

        const totalBlogs = await prisma.blog.findMany({
            where: {
                title: {
                    contains: filter,
                    mode: 'insensitive'
                }
            },
        })

        const blogs = await prisma.blog.findMany({
            skip: start,
            take: end,
            where: {
                title: {
                    contains: filter,
                    mode: 'insensitive'
                }
            },
            select: {
                content: true,
                id: true,
                title: true,
                authorId: true,
                publishedOn: true,
                auther: {
                    select: {
                        name: true,
                    }
                },
            },

        })


        const extractFirstTag = ({html}:{html:string}) => {
            const match = html.match(/<\s*([^ >]+)[^>]*>.*?<\/\1>|<\s*([^ >]+)[^>]*\/>/);
            return match ? match[0] : ''; // Return the first tag or an empty string if not found
        };

        const blogsWithFirstParagraph = blogs.map(blog => {
            const firstParagraph = extractFirstTag({ html: blog.content });
            return {
                ...blog,
                content: firstParagraph,
            };
        });

        c.status(200)
        return c.json({ totalBlogs: totalBlogs.length, blogs:blogsWithFirstParagraph })
    } catch (e) {
        c.status(411)
        return c.text("Error while fetching blogs")
    } finally {
        // Clean up Prisma client to avoid connection leaks
        await prisma.$disconnect();
    }
})

// get blog route
BlogsRouter.get('/:id', async (c) => {

    const body = c.req.param()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: parseInt(body.id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedOn: true,
                auther: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        c.status(200)
        return c.json({
            blog
        })
    } catch (e) {
        c.status(411)
        return c.text("Error while fetching blog")
    }
})

// get blogs based on user id
BlogsRouter.get('/author/', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    try {
        const blog = await prisma.blog.findMany({
            where: {
                authorId: c.get("userId")
            },
            select: {
                id: true,
                title: true,
                content: true,
                auther: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        c.status(200)
        return c.json({
            blog
        })
    } catch (e) {
        c.status(411)
        return c.text("Error while fetching auther blog")
    } finally {
        // Clean up Prisma client to avoid connection leaks
        await prisma.$disconnect();
    }
})