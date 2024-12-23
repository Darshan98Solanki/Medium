import { useBlog } from "@/hooks"
import AppBar from "./AppBar"
import Loader from "./Loader"
import { Avatar } from "./BlogCard"

export default function DetailedBlog({ id }: { id: string }) {

    const { loading, blog } = useBlog({ id })

    return <div>
        <Loader show={loading} />
        <AppBar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full mt-12 max-w-screen-xl">
                <div className="lg:col-span-8 col-span-12">
                    <div className="text-5xl font-extrabold">
                        {blog?.title}
                    </div>
                    <div className="text-slate-500 mt-1">
                        Posted on : 10-10-2024
                    </div>
                    <div className="mt-4">
                        {blog?.content}
                    </div>
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
    </div>

}