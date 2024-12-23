import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/config";
import axios from "axios";

export default function AppBar() {

    
    const navigator = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            navigator("/signin");
            return;
        }

        axios.get(`${BACKEND_URL}api/v1/user/me`, {
            headers: {
                "authorization":token
            }
        }).catch(()=>{
            navigator("/signin")
        })

    }, [])


    const [isOpen, setOpen] = useState(false)

    const toggleDown = () => {
        console.log(isOpen)
        setOpen((prev) => !prev);
    };

    return <>
        <div className="border-b mb-5 py-3 shadow flex justify-between lg:px-10 px-3">
            <Link to="/blogs">
                <h1 className="flex flex-col justify-center mt-2 lg:mt-0 lg:text-3xl text-xl font-bold tracking-wide uppercase cursor-pointer">
                    Tech-Log
                </h1>
            </Link>
            <div>
                <Link to="/publish">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-5 rounded-full">
                        New Log
                    </button>
                </Link>
                <Avatar name="Darshan Solanki" onClick={toggleDown} />
            </div>
        </div>
        {
            isOpen && <div className="absolute right-0 me-2 -mt-6 rounded-sm w-64 bg-white border-l shadow-md">
                <ul className="space-y-1">
                    <li>
                        <Link to="#" className="block rounded px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="block rounded px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                            View Logs
                        </Link>
                    </li>
                    <li>
                        <Link to="/signin" className="block rounded px-4 py-2 text-sm font-medium text-gray-500 bg-red-200 hover:bg-red-400 hover:text-gray-700"
                            onClick={()=>{
                                localStorage.removeItem('token')
                            }}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        }
    </>
}