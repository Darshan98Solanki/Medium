import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useEffect, useState } from "react"

interface BlogType {
    content: string,
    title: string,
    id: number,
    authorId: number,
    auther: {
        name: string
    }
}

export const useBlogs = () => {

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogType[]>([])

    useEffect(() => {

        axios.get(`${BACKEND_URL}api/v1/blogs/bulk`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data);
            setLoading(false)
        })

    }, [])

    return {
        loading,
        blogs
    }
}

export const useBlog = ({ id }: { id: string }) => {

    const [loading, setLoading] = useState(true)
    const [blog, setBlogs] = useState<BlogType>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blogs/${id}`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data.blog);
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blog
    }
}


// get blogs based on authors
export const useAuthorBlog = () => {

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<BlogType[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blogs/author/`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        }).then(response => {
            setBlogs(response.data.blog);
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blogs
    }
}