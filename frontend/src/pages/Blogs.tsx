import AppBar from "@/components/AppBar";
import BlogCard from "@/components/BlogCard";
import BlogListSkeleton from "@/components/BlogListSkeleton";
import NoLogsFound from "@/components/NoLogsFound";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import { useBlogs } from "@/hooks";
import { useState } from "react";

export default function Blogs() {

    const [filter, setFilter] = useState("")
    const blogsPerPage = 5
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(blogsPerPage)

    const { loading, total, blogs } = useBlogs({ filter, start, blogsPerPage })
    console.log(total, blogs.length)
    return <>
        <AppBar />
        <SearchBar onChange={(e) => {
            setFilter(e.target.value)
            setStart(0)
            setEnd(blogsPerPage)
        }} />
        <div className="flex lg:justify-center">
            <div className="lg:w-1/2 lg:max-w-1/2 w-full mx-2 lg:mx-0">
                {
                    loading ? Array(blogsPerPage).fill(0).map((_, index) => <BlogListSkeleton index={index} />) : blogs.length > 0 ? (
                        blogs.map((blog, index) => <BlogCard editable={false} key={index} id={blog.id} authername={blog.auther.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate={blog.publishedOn.split("T")[0]} />)
                    ) : <NoLogsFound />
                }
            </div>
        </div>
        {
            (total > 0 && !loading) ?
                <div className="flex justify-center my-5">
                    <Pagination total={total} blogsPerPage={blogsPerPage} end={end} backWardClick={() => {
                        setStart(e => (e > 0) ? e - blogsPerPage : 0)
                        setEnd(e => (e > total - blogsPerPage) ? e - blogsPerPage : e)
                    }}
                        forWardClick={() => {
                            setStart(e => (e < total - blogsPerPage) ? e + blogsPerPage : e)
                            setEnd(e => (e < total) ? e + blogsPerPage : e)
                        }}
                    />
                </div> : ""
        }
    </>
}