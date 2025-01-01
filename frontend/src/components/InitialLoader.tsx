import "../App.css"

export default function InitialLoader({show}:{show:boolean}) {
    return <>
        {show && <div className="fixed space-x-2 top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-tr from-blue-800 to-purple-700 i z-50">
            <div className="lava-lamp">
                <div className="bubble"></div>
                <div className="bubble1"></div>
                <div className="bubble2"></div>
                <div className="bubble3"></div>
            </div>
        </div>
    }
    </>
}