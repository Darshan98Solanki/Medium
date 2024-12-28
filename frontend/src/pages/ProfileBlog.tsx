import AppBar from "@/components/AppBar";
import BlogCard from "@/components/BlogCard";
import BlogListSkeleton from "@/components/BlogListSkeleton";
import NoLogsFound from "@/components/NoLogsFound";
import { useAuthorBlog } from "@/hooks";

export default function ProfileBlog() {

    const { loading, blogs } = useAuthorBlog()

    return <>
        <AppBar />
        <div className="flex justify-center">
            <div className="lg:w-1/2 lg:max-w-1/2 w-full mx-2 lg:mx-0">
                {
                    loading ? Array(4).fill(0).map((_,index)=><BlogListSkeleton index={index}/>)
                    : blogs ? (blogs.map((blog, index) => <BlogCard editable={true} key={index} id={blog.id} authername={blog.auther.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate="10-10-2024" />)) : <NoLogsFound />
                }
            </div>
        </div>
    </>

}