import Auth from "@/components/Auth";
import Quote from "@/components/Quote";

export default function SingUp() {
    return <>
        <div className="h-screen flex flex-col md:flex-row items-center justify-center">
            <Auth type="signup"/>
            <Quote />
        </div>
    </>
}