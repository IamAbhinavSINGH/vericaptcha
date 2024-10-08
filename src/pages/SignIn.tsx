import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const SignIn = () =>{
    return <div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signin" />
            </div>
            <div className="none md:block">
                <Quote />
            </div>
        </div>
    </div>
}