import { AppBar } from "../components/AppBar"
import { Form } from "../components/Form"
import { Footer } from "../components/Footer"

export const Order = () =>{
    return <div className="h-auto bg-stone-900">
        <AppBar type="Order" />
        <Form />
        <Footer />
    </div>
}