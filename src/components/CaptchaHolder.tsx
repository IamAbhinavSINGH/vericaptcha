import axios from "axios";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface CaptchaImageType {
    id: string;
    sentence : string,
    label : string
    image: string;
}

export const CaptchaHolder = () => {
    const [captchaImage, setCaptchaImage] = useState<CaptchaImageType | null>(null);
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<string>("");

    const navigate = useNavigate();

    const captchaOptions = [
        "sad",
        "happy",
        "love",
        "anger",
        "fear",
        "surprise"
    ];


    const checkLogin = async () => {
        try {
            const usernameLocalStorage = localStorage.getItem("username");
            const passwordLocalStorage = localStorage.getItem("password");

            const params = new URLSearchParams();
            params.append('username', usernameLocalStorage || '');
            params.append('password', passwordLocalStorage || '');
    
            const response = await axios.post(
                `https://backend.vericaptcha.live/token`,
                params, 
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded' 
                    }
                }
            );
    
            localStorage.setItem("token", response.data.access_token);
        } catch (err) {
            console.log(err);
            navigate("/signin");
        }
    };

    const fetchCaptcha = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("token:", token);

            const response = await axios.post('https://backend.vericaptcha.live/captcha/request_captcha', {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.data) {
                setCaptchaImage(response.data);
                console.log("response : " , response.data);
            }
        } catch (error) {
            console.error('Error fetching captcha:', error);
        }
    }
    useEffect(()=>{
        checkLogin();
    }, []);

    useEffect(() => {
        fetchCaptcha();
    }, []);

    const handleButtonClick = (buttonString: string) => {
        if (buttonString === selectedButton) {
            setSelectedButton(null);
            setResponseData("");
        } else {
            setSelectedButton(buttonString);
            setResponseData("");
        }
    }

    const handleClearSelection = () => {
        setSelectedButton(null);
        setResponseData("");
    }

    const handleSubmit = async () => {
        if (selectedButton != null && captchaImage != null) {
            console.log("submit button clicked");
            try {
                const dataToSend = {
                    id : captchaImage.id,
                    suspected_label : selectedButton
                }
                const token = localStorage.getItem("token");
                console.log(token);
                const response = await axios.post('https://backend.vericaptcha.live/captcha/captcha_response/',
                     dataToSend ,{
                        headers : {
                            "Authorization" : `Bearer ${token}`
                        }
                    });

                console.log(response);

                if (response.data === true) {
                    setResponseData("Captcha verified!");
                } else {
                    setResponseData("Sorry, failed to determine you as a human");
                }
                setTimeout(async () => {
                    handleClearSelection();
                    await fetchCaptcha();
                }, 3000);

            } catch (error) {
                console.log("Error:", error);
                setResponseData("Couldn't connect to our server, try again maybe!");
                setTimeout(async () => {
                    handleClearSelection();
                    await fetchCaptcha();
                }, 3000);
            }
        } else if (selectedButton === null) {
            setResponseData("Wait, you haven't selected anything yet!");
        } else if (captchaImage === null) {
            setResponseData("Sorry, couldn't load captcha for you ) :");
        }
    }

    return (
        <div className="h-screen mt-20 bg-stone-900">
            <div className="text-stone-100 text-4xl font-bold mt-20 mb-10 flex justify-center">
                Captcha's Demo
            </div>
            <div className="flex justify-center">
                <div className="w-full max-w-3xl bg-stone-800 border-1 border-stone-800 rounded-lg px-10 py-5">
                    <div className="flex justify-center">
                        {captchaImage ?
                            <img src={`data:image/png;base64,${captchaImage.image}`} alt="Captcha" className="w-auto h-auto" /> :
                            <div className="mt-10 flex items-center justify-center text-stone-400 text-xl font-medium">
                                Loading Captcha...
                            </div>
                        }
                    </div>

                    <div className="mt-20 flex justify-center gap-4 flex-wrap">
                        {
                            captchaOptions.map((option) => (
                                <Button
                                    title={option}
                                    key={option}
                                    onClick={() => handleButtonClick(option)}
                                    selected={option === selectedButton}
                                />
                            ))
                        }
                    </div>

                    <div className="mt-32 flex justify-between">
                        <SubmitButton title="Clear Selection"
                            onClick={handleClearSelection} />

                        <div className="text-stone-200 text-lg font-medium text-center">
                            {responseData}
                        </div>
                        <SubmitButton title="Submit"
                            onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}


function SubmitButton({ title, onClick }: { title: "Submit" | "Clear Selection", onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className="w-auto h-15 text-center text-lg font-semibold text-stone-950 flex items-center rounded-full
            px-6 py-3 bg-stone-200 hover:ring-2 hover:ring-stone-100 hover:outline-none"
        >
            {title}
            {title === "Submit" ? <FiArrowRight className="ml-3"/> : null}
        </button>
    )
}

function Button({ title, onClick, selected }: { title: string; onClick: () => void; selected: boolean }) {
    return (
        <button 
            onClick={onClick} 
            style={{ backgroundColor: selected ? 'darkblue' : 'white' }} 
            className={`text-center text-lg font-semibold text-stone-900 flex items-center rounded-full 
            px-6 py-2 bg-stone-200 hover:ring-2 hover:ring-stone-400 hover:outline-none`}>
            <div className={`${selected ? "text-stone-100" : "text-stone-900"}`}>
                {title}
            </div>
        </button>
    );
}
