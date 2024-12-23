import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export default function AppBar() {
    return <>
        <div className="border-b mb-5 py-3 shadow flex justify-between lg:px-10 px-3">
            <Link to="/blogs">
                <h1 className="flex flex-col justify-center lg:text-3xl text-xl font-bold tracking-wide uppercase cursor-pointer">
                    Tech-Chat
                </h1>
            </Link>
            <div>
                <Avatar name="Darshan Solanki" />
            </div>
        </div>
    </>
}