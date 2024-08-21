import { AppBar } from "../components/AppBar"
import { CaptchaHolder } from "../components/CaptchaHolder"
import { Footer } from "../components/Footer"


export const Captcha = () =>{
    return <div>
        <div className="h-auto bg-stone-900">
            <AppBar type="Captcha"/>
            <CaptchaHolder />
            <Footer />
        </div>
    </div>
}