import Auth from "@/components/Auth";
import Quote from "@/components/Quote";

export default function SingIn() {
    return <>
        <div className="h-screen flex flex-col md:flex-row items-center justify-center">
            <Auth type="signin" />
            <Quote/>
        </div>
    </>
}