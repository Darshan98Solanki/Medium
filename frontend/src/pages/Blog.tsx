import DetailedBlog from "@/components/Detailedblog"
import { useParams } from "react-router-dom"

export default function Blog() {

    const id  = useParams().id || ""
    
    return <>
        <DetailedBlog id={id}/>
    </>
}