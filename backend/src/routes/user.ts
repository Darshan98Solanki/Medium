import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { loginSchema, updateUserSchema, UpdateUserSchema, userSchema } from '@darshan98solanki/medium-common'
import crypto from "crypto-js"

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
          password: crypto.AES.encrypt(userData.data.password, c.env.JWT_SECRET).toString()
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
        },
        select: {
          password: true,
          id: true
        }
      })

      if (userData.data.password !== crypto.AES.decrypt(user?.password || "", c.env.JWT_SECRET).toString(crypto.enc.Utf8)) {
        c.status(403)
        return c.text("Email or password incorrect")
      }

      if (user) {
        const jwt = await sign({
          id: user.id
        }, c.env.JWT_SECRET)
        return c.text(jwt)
      }

    } catch (e) {
      c.status(411)
      return c.text("Some error while login")
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
        name: true
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

  const userData = updateUserSchema.safeParse(body)

  if (!userData.success) {
    c.status(411)
    return c.json(userData.error.errors[0].message)
  } else {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const data : { name?:string, password?:string } = {}

    if(userData.data.name)
      data.name = userData.data.name

    if(userData.data.password)
      data.password = crypto.AES.encrypt(userData.data.password, c.env.JWT_SECRET).toString()


    try {

      const user = await prisma.user.update({
        where: {
          email: userData.data.email,
        },
        data:data
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