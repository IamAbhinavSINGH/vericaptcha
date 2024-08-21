import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="h-auto mt-20 bg-stone-900 py-4 px-6 border-t border-stone-800">
     <div className="flex gap-20 lg:gap-80 justify-center ">
        <div className="flex flex-col">
            <div className="text-stone-100 text-3xl font-bold">
                VERICAPTCHA
            </div>
            <div className="grid grid-cols-4 gap-8 mt-4">
                <BsTwitter className="text-stone-100 w-6 h-6"/>
                <a href="https://www.linkedin.com/in/abhinav-singh-b617bb232/" target="_blank">
                    <SiLinkedin  className="text-stone-100 w-6 h-6"/>
                </a>
                <BsYoutube  className="text-stone-100 w-6 h-6"/>
                <FaFacebookF  className="text-stone-100 w-6 h-6" />                
            </div>
        </div>
        <div className="flex flex-col">
            <div><button className="text-stone-300 text-lg font-semibold">Help</button></div>
            <div><button className="text-stone-300 text-lg font-semibold">Share</button></div>
            <div><button className="text-stone-300 text-lg font-semibold">Careers</button></div>
            <div><button className="text-stone-300 text-lg font-semibold">Testimonials</button></div>
            <div><button className="text-stone-300 text-lg font-semibold">Work</button></div>
        </div>
        <div>
            <div>
                <button className="text-stone-300 text-lg font-semibold">Terms & Conditions</button>
            </div>
            <div>
                <button className="text-stone-300 text-lg font-semibold">Privacy policy</button>
            </div>
        </div>
     </div>
    </footer>
  );
};