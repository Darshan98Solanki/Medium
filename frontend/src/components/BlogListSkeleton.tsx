export default function BlogListSkeleton({ index }: { index: number }) {

    return <div className="pb-3" key={index}>
        <div className="hover:animate-background rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-blue-700 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
            <div className="rounded-[10px] bg-white p-4 sm:p-6">
                <div role="status" className="animate-pulse md:flex md:items-center">
                    <div className="w-full">
                        <div className="flex">
                            <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            <div className="flex flex-col justify-center mt-2">
                                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
                            </div>
                        </div>
                        <div className="h-5 mt-4 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-4"></div>
                        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}