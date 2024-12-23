import { ChangeEvent, useState } from "react";
import AppBar from "./AppBar";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

export default function Publish() {

    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigator = useNavigate()
    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{
                header: [1, 2, 3, 4, 5, 6, false],
            }],
            [{
                font: [],
            }],
            [{
                size: []
            }],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" }
            ],
            ["link", "image", "video"]
        ]
    }

    function handlePost() {
        setLoading(true)
        axios.post(BACKEND_URL + "api/v1/blogs", { title, content }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(() => {
            navigator("/blogs")
        }).catch(err => {
            toast.error(err.response.data);
        }).finally(() => {
            setLoading(false);
        })
    }

    return <>
        <AppBar />
        <ToastContainer />
        <div className="flex justify-center w-full mt-16">
            <div className="max-w-screen-xl w-full mx-2 lg:mx-0">
                <input type="text" className="bg-gray-50 w-full border border-gray-300 text-gray-900 block p-2.5 text-sm rounded-lg " placeholder="Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <div className="mt-5 h-1/2">
                    <ReactQuill className="h-full" modules={modules} theme="snow" value={content} onChange={(e) => setContent(e)} />
                </div>
                <div className="mt-20 lg:mt-14">
                    <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow the <b>Etiquette</b></p>
                    <div className="flex items-center justify-end px-3 py-2 border-t">
                        <button type="submit" onClick={handlePost} disabled={loading} className="py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            {loading ? "Posting..." : "Post Log"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export function TextEditor({ onChange, isDisabled, placeholder }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; isDisabled: boolean; placeholder: string }) {
    return <>
        <div>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg">
                    <textarea
                        disabled={isDisabled}
                        onChange={onChange}
                        rows={10} className="w-full px-0 text-sm focus:outline-none text-gray-900 bg-white border-0 dark:text-white" placeholder={placeholder} ></textarea>
                </div>
            </div>
        </div>
    </>
}
