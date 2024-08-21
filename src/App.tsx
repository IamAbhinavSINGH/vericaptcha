import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home"
import { Captcha } from "./pages/Captcha"
import { Order } from "./pages/Order"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { MarketPlace } from "./pages/MarketPlace"

function App() {

  return (
    <>
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={ <Home /> }></Route>
          <Route path="/signin" element={ <SignIn /> }></Route>
          <Route path="/signup" element={ <SignUp /> }></Route>
          <Route path="/order" element={ <Order /> }></Route>
          <Route path="/captcha" element={ <Captcha /> }></Route>
          <Route path="/marketplace" element = { <MarketPlace /> } />
        </Routes>
      </BrowserRouter>    
    </>
  )
}


export default App
