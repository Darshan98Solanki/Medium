import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { loginSchema, userSchema } from '../validation'

export const UserRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
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
