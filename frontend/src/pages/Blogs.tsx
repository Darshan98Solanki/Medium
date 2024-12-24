import AppBar from "@/components/AppBar";
import BlogCard from "@/components/BlogCard";
import Loader from "@/components/Loader";
import { useBlogs } from "@/hooks";

export default function Blogs() {
    
    const {loading, blogs} = useBlogs()

    return <>
        <AppBar />
        <Loader show={loading}/>
        <div className="flex justify-center">
            <div className="lg:w-1/2 max-w-1/2 mx-2 lg:mx-0">
                {blogs.map((blog,index) => <BlogCard editable={false} key={index} id={blog.id} authername={blog.auther.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate="10-10-2024"/>)}
            </div>
        </div>
    </>
}