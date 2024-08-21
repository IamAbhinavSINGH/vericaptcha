import { Link, useNavigate } from "react-router-dom"
import { LabelledInputBox } from "./LabelledInputBox"
import { useState } from "react"
import axios from "axios";

export const Auth = ({ type } : {type : "signup" | "signin"}) => {

    const [inputFields, setInputFields] = useState({
        name: "",
        username: "",
        password : ""
    });

    const navigate = useNavigate();

    const [response , setResponse] = useState("");

    const sendRequest = async () => {
        try {
            setResponse("");
            const responseObj = await axios.post(
                `https://backend.vericaptcha.live/user/${type === "signup" ? "signup" : "signin"}`,
                inputFields
            );

            if (responseObj.data) {
                setResponse("Successfully signed in");
                navigate("/");
                localStorage.setItem("username", inputFields.username);
                localStorage.setItem("password", inputFields.password);
            }
        } catch (err: any) {
            if (err.response && err.response.data) {
                setResponse(err.response.data.detail || "An error occurred");
            } else {
                setResponse("An error occurred");
            }
            console.error("Error while " + type + " : ", err);
        }
    };


    return <div className="h-screen flex justify-center flex-col bg-stone-900">
        <div className="bg-stone-900 flex justify-center">
           <div>
                <div className="px-10">
                    <div className="text-slate-100 text-3xl font-bold">
                        Create an account
                    </div>
                    <div className="text-slate-300 text-l flex justify-center">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className=" pl-2 underline" to={type==="signin" ? "/signup" : "/signin"}> 
                            {type === "signin" ? "Sign up" : "Sign in"}
                         </Link>
                    </div>
                    <div className="">
                        <div className="pt-2">
                            {type === "signup" ? <LabelledInputBox value="Name" placeholder="Abhinav..." onChange={(e) => {
                                setInputFields({
                                    ...inputFields,
                                    name: e.target.value
                                })
                            }} /> : null}

                            <LabelledInputBox value="Username" placeholder="123@gmail.com" type={"email"} onChange={(e)=>{
                                setInputFields({
                                    ...inputFields,
                                    username : e.target.value
                                })
                            }}/>

                            <LabelledInputBox value="Password" type={"password"} placeholder="123456" onChange={(e)=>{
                                setInputFields({
                                    ...inputFields,
                                    password : e.target.value
                                })
                            }}/>
                        </div>
                        <div className="mt-6">
                        <button onClick={sendRequest} type="button" className="w-full text-lg flex justify-center text-gray-900 bg-white border border-gray-300
                         focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-stone-600 font-bold rounded-lg
                        p-2 me-2 mb-2">
                            {type === "signin" ? "Sign in" : "Sign up"}
                        </button>
                        </div>
                        <div className="text-stone-100 text-xl max-w-60">
                            {response ? response : ""}
                        </div>
                    </div>
                </div>
           </div>
        </div>
    </div>
}