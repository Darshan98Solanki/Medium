import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { loginSchema, userSchema } from '@darshan98solanki/medium-common'

export const UserRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  },
  Variables: {
    userId: number
  }
}>

// user sign up route 
UserRouter.post('/signup', async (c) => {

  const body = await c.req.json()

  const userData = userSchema.safeParse(body)

  if (!userData.success) {
    c.status(411)
    return c.json(userData.error.errors[0].message)
  } else {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // if duplicate email address is used
    try {

      const user = await prisma.user.create({
        data: {
          name: userData.data.name,
          email: userData.data.email,
          password: userData.data.password
        }
      })

      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET)

      return c.text(jwt)

    } catch (e) {
      c.status(411)
      return c.text("User is already exist with this email")
    }
  }
})

// user sign in route
UserRouter.post('/signin', async (c) => {
  const body = await c.req.json()

  const userData = loginSchema.safeParse(body)

  if (!userData.success) {
    c.status(411)
    return c.json(userData.error.errors[0].message)
  } else {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    // if duplicate email address is used
    try {

      const user = await prisma.user.findFirst({
        where: {
          email: userData.data.email,
          password: userData.data.password
        }
      })

      if (!user) {
        c.status(403)
        return c.text("Email or password incorrect")
      } else {
        const jwt = await sign({
          id: user.id
        }, c.env.JWT_SECRET)
        return c.text(jwt)
      }

    } catch (e) {
      c.status(411)
      return c.text("User is already exist with this email")
    }
  }
})

UserRouter.use('/*', async (c, next) => {

  const auth = c.req.header().authorization

  if (!auth || !auth.startsWith('Bearer ')) {
    c.status(401)
    return c.text("You are Unauthorized")
  } else {
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
  }
})

// me request for auto login
UserRouter.get("/me", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {

    const user = await prisma.user.findUnique({
      where: {
        id: c.get("userId")
      },
      select: {
        name: true,
      }
    })

    c.status(200)
    return c.json({ data: true, name: user?.name })
  } catch (error) {
    c.status(411)
    return c.text("User is not authorized")
  } finally {
    // Clean up Prisma client to avoid connection leaks
    await prisma.$disconnect();
  }

})


// get profile data
UserRouter.get("/", async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())


  try {

    const user = await prisma.user.findUnique({
      where: {
        id: c.get("userId")
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true
      }
    })

    if (!user) {
      c.status(404)
      return c.text("User not found")
    }
    return c.json(user)
  } catch (error) {
    c.status(411)
    return c.text("User data is not found")
  } finally {
    // Clean up Prisma client to avoid connection leaks
    await prisma.$disconnect();
  }
})

//update user profile
UserRouter.put("/update", async (c) => {

  const body = await c.req.json()

  const userData = userSchema.safeParse(body)

  if (!userData.success) {
    c.status(411)
    return c.json(userData.error.errors[0].message)
  } else {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {

      const user = await prisma.user.update({
        where: {
          email: userData.data.email,
        },
        data: {
          name: userData.data.name,
          password: userData.data.password
        }
      })
      if (user) {
        c.status(200)
        return c.text("User data is updated successfully")
      }
    } catch (e) {
      c.status(411)
      return c.text("User data is not updated")
    } finally {
      // Clean up Prisma client to avoid connection leaks
      await prisma.$disconnect();
    }
  }
})