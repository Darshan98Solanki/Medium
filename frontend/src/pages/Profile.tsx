import AppBar from "@/components/AppBar";
import { InputBox } from "@/components/Auth";
import Loader from "@/components/Loader";
import Quote from "@/components/Quote";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/user`, {
            headers: {
                "authorization": localStorage.getItem("token")
            }
        }).then(response => {
            setName(response.data.name);
            setEmail(response.data.email);
            setPassword(response.data.password);
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        try {
            setLoading(true)
            await axios.put(`${BACKEND_URL + `api/v1/user/update`}`, { name, email, password }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            toast.success(`User updated successfully`)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    return <>
        <AppBar />
        <Loader show={loading} />
        <div className="h-screen md:-mt-5 mt-20 flex flex-col md:flex-row lg:items-center lg:justify-center">
            <div className="flex w-full md:w-1/2 justify-center items-center bg-white">
                <form className="bg-white w-full max-w-sm px-4" onSubmit={handleUpdate}>
                    <h2 className="justify-center flex mb-4 text-2xl lg:text-3xl font-bold">
                        User Profile
                    </h2>
                    <InputBox placeholder="Email" value={email} disabled={true} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <InputBox placeholder="Name" value={name} onChange={(e) => {
                        setName(e.target.value);
                    }} />
                    <InputBox placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <button type="submit" className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Update Profile</button>
                </form>
            </div>
            <Quote onLogin={false} />
        </div>
    </>

}