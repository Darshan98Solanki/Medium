import AppBar from "@/components/AppBar";
import BlogCard from "@/components/BlogCard";
import Loader from "@/components/Loader";
import { useAuthorBlog } from "@/hooks";

export default function ProfileBlog() {

    const { loading, blogs } = useAuthorBlog()

    return <>
        <Loader show={loading} />
        <AppBar />
        <div className="flex justify-center">
            <div className="lg:w-1/2 max-w-1/2 mx-2 lg:mx-0">
                {blogs.map((blog, index) => <BlogCard editable={true} key={index} id={blog.id} authername={blog.auther.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate="10-10-2024" />)}
            </div>
        </div>
    </>

}