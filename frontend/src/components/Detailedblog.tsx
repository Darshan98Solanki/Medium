import { useBlog } from "@/hooks"
import AppBar from "./AppBar"
import { Avatar } from "./BlogCard"
import BlogSkeleton from "./BlogSkeleton"

export default function DetailedBlog({ id }: { id: string }) {

    const { loading, blog } = useBlog({ id })

    return <div>
        <AppBar />
        {
            (loading) ?
                <BlogSkeleton /> :
                <div className="flex justify-center">
                    <div className="grid grid-cols-12 px-10 w-full my-12 max-w-screen-xl">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="text-5xl font-extrabold">
                                {blog?.title}
                            </div>
                            <div className="text-slate-500 mt-2">
                                Posted on : {blog?.publishedOn.split("T")[0]}
                            </div>
                            <div className="mt-4" dangerouslySetInnerHTML={{ __html: (blog?.content) ? blog.content : "" }}></div>
                        </div>
                        <div className="lg:col-span-4 col-span-12 mt-16 lg:mt-0">
                            <div className="font-semibold">
                                Author
                            </div>
                            <div className="mt-4 flex">
                                <Avatar name={blog?.auther.name || "Anonymous"} />
                                <div className="ms-2 flex flex-col justify-center text-2xl font-bold">
                                    {blog?.auther.name || "Anonymous"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        }
    </div>

}