import * as zod from 'zod'

export const userSchema = zod.object({
    email: zod.string({message:"email is required"}).email({message:"please enter valid email"}),
    name: zod.string().min(2, {message:"username length is too short"}).optional(),
    password: zod.string().min(8, {message:"password must be 8 char long"})
})

export const loginSchema = zod.object({
    email: zod.string({message:"email is required"}).email({message:"please enter valid email"}),
    password: zod.string().min(8, {message:"password must be 8 char long"})
}) 