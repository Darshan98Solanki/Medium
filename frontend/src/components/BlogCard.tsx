import { Link } from "react-router-dom"

interface blogCard {
    id:number,
    authername: string,
    title: string,
    content: string,
    publishedDate: string
}

export default function BlogCard({
    id,
    authername,
    title,
    content,
    publishedDate
}: blogCard) {

    return <div className="pb-3">
        <article className="hover:animate-background rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-blue-700 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 sm:p-6">
                <div className="flex">
                    <Avatar name={authername} />
                    <span className="flex flex-col ms-2 text-sm justify-center text-gray-900">{authername}</span>
                    <div className="flex flex-col justify-center px-1">
                        <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                    </div>
                    <span className="flex flex-col text-sm justify-center text-gray-400">{" " + publishedDate}</span>
                </div>

                <Link to={`/blog/${id}`}>
                    <h3 className="mt-0.5 text-xl font-semibold text-gray-900">
                        {title}
                    </h3>
                </Link>
                <h3 className="mt-0.5 text-md font-thin text-gray-900">
                    {(content.length > 100) ? content.slice(0, 100) + "..." : content}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1">
                    <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                        {`${Math.ceil(content.length / 100)} min read`}
                    </span>
                </div>
            </div>
        </article>
    </div>
}

export function Avatar({ name, onClick }: { name: string, onClick?: () => void}) {

    return <div className={`relative inline-flex items-center ${onClick?`cursor-pointer` : `cursor-default`} justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
            onClick={onClick}
        >
        <span className="font-medium text-gray-600 dark:text-gray-300 capitalize">{name.split(" ").map(name => name[0])}</span>
    </div>
}