import icon from "../../public/folder-icon.svg"
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";

interface AppBarPropsType {
    type: "Home" | "Order" | "Captcha" | "Marketplace" ;
}

export const AppBar = ({type} : AppBarPropsType) =>{

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [username , setUserName] = useState<string>("");
    const [isLoggedIn , setLogInStatus] = useState<boolean>(true);
    
    const logOut = () =>{

        if(isLoggedIn == false){
            navigate("/signup");
        }

        localStorage.removeItem("username");
        localStorage.removeItem("password");
        setLogInStatus(!isLoggedIn);
    }

    const checkLogin = () => {
        const storedName = localStorage.getItem("username");
        if(storedName != null){
            setUserName(storedName);
            setLogInStatus(true);
        }else setLogInStatus(false);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(()=>{
        checkLogin();
    },[])

    return(
        <div>
        <nav className="border-stone-800 bg-stone-900">
            <div className="flex items-center justify-between mx-auto pt-2 pb-2 border-b border-stone-800">
                <div className="flex items-center pl-4">
                    <img src={icon} className="h-8 mr-3" alt="Vericaptcha Logo" />
                    <Link to={"/"} className="flex items-center">
                        <span className="text-stone-100 text-xl font-semibold whitespace-nowrap">
                            Vericaptcha
                        </span>
                    </Link>
                    <div className="ml-6 hidden md:flex space-x-4">
                        <RenderButtons type={type} />
                    </div>
                </div>
                <div className="flex items-center">
                    <LogButton logOut={logOut} isLoggedIn={isLoggedIn}>

                    </LogButton>
                    <Avatar onClick={()=>{}} name={username} />
                    <button
                        className="md:hidden text-stone-100 focus:outline-none pr-4"
                        onClick={toggleMenu}
                    >
                        <FiMenu className="h-6 w-6" />
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden flex flex-col space-y-2 mt-2 px-4 pb-4">
                    <RenderButtons type={type} />
                </div>
            )}
        </nav>
    </div>
    );
}

function RenderButtons({type} : AppBarPropsType){
    const buttons = [
        { name : "Home", linkTo : "" },
        { name : "Captcha" , linkTo : "captcha"},
        { name : "Order" , linkTo : "order"}
    ]

    return (
        <div className="md:flex md:flex-row md:space-x-4 space-y-2 md:space-y-0 flex flex-col md:items-center">
        {buttons.map((button) =>
            button.name !== type ? (
                <Button key={button.name} name={button.name} linkTo={button.linkTo} />
            ) : null
        )}
    </div>
    );
}

function LogButton({logOut , isLoggedIn} : {logOut : () => void , isLoggedIn : Boolean}){
    return (
        <button onClick={logOut} className="text-md text-red-500 font-semibold mr-4">
            {
                isLoggedIn ? "Log out" : "Log in"
            }
        </button>
    );
}

function Button({name , linkTo} : {name : string , linkTo : string}){
    return <Link to={`/${linkTo}`}>
        <button type="button" className="text-stone-400 bg-stone-900 hover:bg-stone-800 hover:outline-none
            focus:outline-none focus:ring-1 focus:ring-stone-800 hover:text-stone-100 rounded-full 
            text-sm font-medium ml-2 me-2 ps-3 pe-3 px-2 py-2" >
            {name}
        </button>
    </Link>
}

function Avatar({name , onClick} : {name : string , onClick : () => void}){
    return (
        <div>
            <button onClick={onClick}>
                <div className="pr-4">
                    <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden
                         bg-stone-600 rounded-full">
                        <span className="font-small text-stone-200">{name[0]}</span>
                    </div>
                </div>
            </button>
        </div>
    );
   
}