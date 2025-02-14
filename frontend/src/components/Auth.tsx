import { BACKEND_URL } from "@/config"
import { UserSchema } from "@darshan98solanki/medium-common"
import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import InitialLoader from "./InitialLoader"

export default function Auth({ type }: { type: "signin" | "signup" }) {

    const navigator = useNavigate()
    const [postInput, setPostInputs] = useState<UserSchema>({
        name: "",
        email: "",
        password: ""
    })
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${BACKEND_URL}api/v1/user/me`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        }).then(() => {
        setLoading(false)
            navigator("/blogs")
        }).finally(()=>{
            setLoading(false)
        })
    }, [navigator])

    async function sendRequest(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL + `api/v1/user/${type === "signup" ? "signup" : "signin"}`}`, postInput)
            localStorage.setItem("token", "Bearer " + response.data)
            navigator("/blogs")
        } catch (err) {
            if (axios.isAxiosError(err) && err.response)
                toast.error(err.response.data)
        } finally {
            setLoading(false)
        }

    }

    return <>
        <InitialLoader show={isLoading}/>
        <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
            <form className="bg-white w-full max-w-sm px-4 md:w-1/2" onSubmit={sendRequest}>
                <h2 className="justify-center flex mb-4 text-2xl font-bold">
                    {type === "signup" ? "Create an account" : "Login to account"}
                </h2>
                {type === "signup" ?
                    <InputBox placeholder="Name" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} /> : null
                }
                <InputBox placeholder="Email" value={postInput.email} onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        email: e.target.value.trim().toLowerCase()
                    }))
                }} />
                <InputBox placeholder="Password" type="password" onChange={(e) => {
                    setPostInputs({
                        ...postInput,
                        password: e.target.value
                    })
                }} />
                <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">
                    {(type === "signin") ? "Sign In" : "Sign Up"}
                </button>
                <span className="text-sm mt-2 flex justify-center">
                    {type === "signup" ? <div>
                        Already have an account? <Link className="ml-1 cursor-pointer underline" to="/signin">Sign In</Link>
                    </div> : <div>
                        Don't have an account? <Link className="ml-1 cursor-pointer underline" to="/signup">Sign Up</Link>
                    </div>
                    }
                </span>
            </form>
        </div>
    </>
}

interface InputBoxType {
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    value?: string,
    disabled?: boolean
}

export function InputBox({ placeholder, onChange, type, value, disabled }: InputBoxType) {
    return <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
        <input className="pl-2 outline-none border-none w-full" type={type || "text"} disabled={disabled} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
}