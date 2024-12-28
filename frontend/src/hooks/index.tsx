import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useEffect, useState } from "react"

interface BlogType {
    content: string,
    title: string,
    id: number,
    authorId: number,
    publishedOn:string,
    auther: {
        name: string
    }
}

export const useBlogs = ({ filter,start, blogsPerPage }: { filter: string, start:number, blogsPerPage:number }) => {

    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [blogs, setBlogs] = useState<BlogType[]>([])

    useEffect(() => {
        setLoading(true)
        const time = setTimeout(() => {
            axios.get(`${BACKEND_URL}api/v1/blogs/bulk?filter=${filter}&start=${start}&end=${blogsPerPage}`, {
                headers: {
                    "authorization": localStorage.getItem("token")
                }
            }).then(response => {
                setBlogs(response.data.blogs);
                setTotal(response.data.totalBlogs);
                setLoading(false)
            })
        }, 300)
        return () => {
            clearTimeout(time)
        }
    }, [filter,start, blogsPerPage])

    return {
        loading,
        total,
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
