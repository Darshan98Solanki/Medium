import { useState, useEffect } from "react";
import AppBar from "./AppBar";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { useBlog } from "@/hooks";
import InitialLoader from "./InitialLoader";

export default function Publish() {

    const id = useParams().id || ""
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const { blog } = useBlog({ id: id })

    useEffect(() => {
        if (id) {
            if (blog) {
                setTitle(blog.title);
                setContent(blog.content);
                setLoading(false);
            }
        } else {
            setTitle("");
            setContent("");
            setLoading(false);
        }
    }, [id, blog]);


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

        if(!id){   
            axios.post(BACKEND_URL + `api/v1/blogs`, { title, content }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }).then((response) => {
                navigator(`/blog/${response.data.id}`)
            }).catch(err => {
                toast.error(err.response.data);
            }).finally(() => {
                setLoading(false);
            })
        }else{
            axios.put(BACKEND_URL + `api/v1/blogs`, { title, content, id:parseInt(id) }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }).then(() => {
                navigator("/profile/logs")
            }).catch(err => {
                toast.error(err.response.data);
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    return <>
        <AppBar />
        <InitialLoader show={loading}/>
        <div className="flex justify-center w-full mt-16">
            <div className="max-w-screen-xl w-full mx-2 xl:mx-0">
                <input type="text" value={title} className="bg-gray-50 w-full border border-gray-300 text-gray-900 block p-2.5 text-sm rounded-lg " placeholder="Title"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <div className="mt-5 h-1/2">
                    <ReactQuill defaultValue={content} className="h-full" modules={modules} theme="snow" value={content} onChange={(e) => setContent(e)} />
                </div>
                <div className="mt-28 sm:mt-20 lg:mt-14">
                    <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow the <b>Etiquette</b></p>
                    <div className="flex items-center justify-end px-3 py-2 border-t">
                        <button type="submit" onClick={handlePost} disabled={loading} className="py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            {!id ? (loading ? "Posting..." : "Post Log") : (loading ? "Updating..." : "Update Log")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}
