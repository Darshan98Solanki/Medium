import { ToastContainer, toast } from "react-toastify"
export default function Quote() {

    return <div
        className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr h-full from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
            <ToastContainer />
            <h1 className="text-white font-bold text-4xl font-sans">Tech-Log</h1>
            <p className="text-white mt-1">Where ideas meet innovation idea🎯</p>
            <p className="text-white mt-1">share, explore, and engage like Twitter🕊, dive deep like Medium📚.</p>
            <p className="text-white font-light mt-1">Created By | Darshan Solanki</p>
            <button
                onClick={()=>{
                    toast.info("To access log's create account or login")
                }}
            type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
    </div>
}