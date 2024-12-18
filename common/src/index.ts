import * as zod from 'zod'

// user signup schema
export const userSchema = zod.object({
    email: zod.string({message:"email is required"}).email({message:"please enter valid email"}),
    name: zod.string().min(2, {message:"username length is too short"}).optional(),
    password: zod.string().min(8, {message:"password must be 8 char long"})
})

// user login schema
export const loginSchema = zod.object({
    email: zod.string({message:"email is required"}).email({message:"please enter valid email"}),
    password: zod.string().min(8, {message:"password must be 8 char long"})
}) 

// Post Blog Schema
export const PostBolgSchema = zod.object({
    title: zod.string({message:"title is required"}).min(5, {message:"Title must be at least 5 characters"}),
    content: zod.string({message:"content is required"}).min(30, {message:"Content must be at least 30 characters"}),
})

// Update Blog schema
export const UpdateBolgSchema = zod.object({
    title: zod.string({message:"title is required"}).min(5, {message:"Title must be at least 5 characters"}),
    content: zod.string({message:"content is required"}).min(30, {message:"Content must be at least 30 characters"}),
    id: zod.number({message:"id is required"}).min(1, {message:"Some error occurred please check"}),
})


// infer schema which will used in frontend
export type UserSchema = zod.infer<typeof userSchema>
export type LoginSchema = zod.infer<typeof loginSchema>
export type PostBlogSchema = zod.infer<typeof PostBolgSchema>
export type UpdateBlogSchema = zod.infer<typeof UpdateBolgSchema>