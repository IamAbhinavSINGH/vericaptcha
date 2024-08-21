import { AppBar } from "../components/AppBar"
import { LandingPage } from "../components/LandingPage"
import { About } from "../components/About"
import { Work } from "../components/Work"
import { Footer } from "../components/Footer"


export const Home = () =>{
    return <div >
        <div className="h-auto bg-stone-900">
            <AppBar type="Home"/>
            <LandingPage /> 
            <About />
            <Work />
            <Footer />
        </div>
    </div>
}