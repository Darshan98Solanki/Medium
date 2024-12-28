import { BACKEND_URL } from "@/config"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

interface blogCard {
    id: number,
    authername: string,
    title: string,
    content: string,
    publishedDate: string,
    editable: boolean,
    key: number
}

export default function BlogCard({
    id,
    authername,
    title,
    content,
    publishedDate,
    editable,
    key
}: blogCard) {

    const navigator = useNavigate()

    function deleteLog({ id }: { id: number }) {

        toast.success("Deleted Successfully Refreshing...")
        axios.delete(`${BACKEND_URL}api/v1/blogs/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(() => {
            navigator(0)
        }
        ).catch(err => {
            toast.error(err.response.data)
        })


    }

    return <div className="pb-3" key={key}>
        <article className="hover:animate-background rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-blue-700 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 sm:p-6">
                <div className="flex">
                    <Avatar name={authername} />
                    <span className="flex flex-col ms-2 text-sm justify-center text-gray-900">{authername}</span>
                    <div className="flex flex-col justify-center px-1">
                        <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                    </div>
                    <span className="flex flex-col text-sm justify-center text-gray-400">{" " + publishedDate}</span>
                    {editable &&
                        <div className="ms-auto">
                            <div className="flex ms-5">
                                {/* Edit Button */}
                                <Link to={`/edit/${id}`} >
                                    <svg className="h-4 lg:h-6 w-4 lg:w-6 inline-block align-middle mt-2 text-blue-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                </Link>

                                {/* Delete Button */}
                                <div onClick={() => deleteLog({ id })}>
                                    <svg className="h-4 lg:h-6 w-4 lg:w-6 cursor-pointer inline-block align-middle mt-2 ms-2 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />  <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <Link to={`/blog/${id}`}>
                    <h3 className="mt-0.5 text-xl font-semibold text-gray-900">
                        {title}
                    </h3>
                </Link>
                <h3 className="mt-0.5 text-md font-thin text-gray-900" dangerouslySetInnerHTML={{ __html: (content.length > 45) ? content.slice(0, 45) + "..." : content }}></h3>
                <div className="mt-4 flex flex-wrap gap-1">
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                        {`${(content.length / 100 > 10) ? 10 : Math.ceil(content.length / 100)} min read`}
                    </span>
                </div>
            </div>
        </article>
    </div>
}

export function Avatar({ name, onClick }: { name: string, loading?: boolean, onClick?: () => void }) {

    return <div className={`relative inline-flex items-center ${onClick ? `cursor-pointer` : `cursor-default`} justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
        onClick={onClick}
    >
        <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">{(name) ? name.split(" ").map(name => name[0]) : "❔"}</span>
    </div>
}