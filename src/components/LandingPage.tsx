import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"
import image from "../assets/data-img-background.jpeg"

export const LandingPage = () => {
    return (
        <div className="relative h-screen flex items-center justify-center" 
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${image})` }}
        >
           
            <div className="relative z-10 mb-20 flex flex-col items-center">
                <div className="text-stone-50 text-6xl font-bold text-center">
                    All your data needs at one place
                </div>
                <p className="mt-8 text-stone-100 text-xl font-semibold leading-relaxed text-center lg:w-96">
                    Get any type of data for all your needs.
                    All your custom data needs are catered personally.
                </p>
                <Button />
            </div>
        </div>
    )
}

function Button(){
    return (
        <div className="mt-5">
            <Link to="/order">
            <button className="w-auto h-15 text-center text-lg font-semibold text-stone-950 flex items-center rounded-full
                px-8 py-3 bg-stone-100 hover:ring-2 hover:ring-stone-100 hover:outline-none">
                        Order now
                    <FiArrowRight className="pl-1 w-5 h-5"/>
            </button>
           </Link>
        </div>
    )
}