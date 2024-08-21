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

interface Label<K,V> {
    label : K;
    tag : V;
}

export const CaptchaHolder = () => {
    const [captchaImage, setCaptchaImage] = useState<CaptchaImageType | null>(null);
    const [responseData, setResponseData] = useState<string>("");
    const [labelledImages, setLabelledImages] = useState<Label<string, string>[]>([]);
    const [result , setResult] = useState<string>();

    const navigate = useNavigate();


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

            const response = await axios.post('https://backend.vericaptcha.live/captcha/request_captcha', {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            await getLabelImages();

            if (response.data) {
                setCaptchaImage(response.data);
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


    const clearResult = () => {
        setResult("");
    }

    const handleSubmit = async () => {
        if (result != null && result.length > 0 && captchaImage != null) {
            console.log("submit button clicked");
            try {
                const dataToSend = {
                    id : captchaImage.id,
                    suspected_label : result
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
                    clearResult();
                    await fetchCaptcha();
                }, 3000);

            } catch (error) {
                console.log("Error:", error);
                setResponseData("Couldn't connect to our server, try again maybe!");
                setTimeout(async () => {
                    await fetchCaptcha();
                }, 3000);
            }
        }  else if (captchaImage === null) {
            setResponseData("Sorry, couldn't load captcha for you ) :");
        }
    }

    const getLabelImages = async() => {
       try{
            const token = localStorage.getItem("token");

            const response = await axios.get('https://backend.vericaptcha.live/captcha/request_labels',{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

           
            if (response.data) {
                // Convert object to array of Label objects with tag cast to string
                const labelsArray = Object.entries(response.data).map(([key, value]) => ({
                    label: key,
                    tag: String(value) // Ensure tag is treated as a string
                }));

                setLabelledImages(labelsArray);
            }
            
       }catch(err){
            console.log(err);
            setLabelledImages([]);
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
            {
                captchaImage ? 
                <div className="text-xl text-stone-100 font-medium mt-4 flex justify-center">
                    Please type the correct emotion for the given sentence!
                </div> : null
            }
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
                {labelledImages.length > 0 ? (
                        labelledImages.map((image) => (
                            <Image key={image.label} imageString={image.tag} />
                        ))
                    ) : (
                        <div className="text-stone-400">Loading labeled images...</div>
                    )}
            </div>

            <div className="mt-20 flex flex-col items-center">
                <div className="w-full flex items-center max-w-md space-x-4">
                    <label className="text-lg font-medium text-stone-200 flex-shrink-0">Your answer:</label>
                    <input
                        className="flex-grow pl-3 rounded-xl py-2"
                        id="result"
                        type="text"
                        onChange={(e) => { setResult(e.target.value) }}
                        style={{ maxWidth: '80px' }} // Optional, adjust max width
                    />
                    <SubmitButton title="Submit" onClick={handleSubmit} />
                </div>
                <div className="mt-4 text-stone-200 text-lg font-medium text-center">
                    {responseData}
                </div>
            </div>
        </div>
    </div>
</div>

    );
}


function Image({imageString} : {imageString : string}){
    return (
        <img src={`data:image/png;base64,${imageString}`} className="w-auto h-auto"/>
    )
}

function SubmitButton({ title, onClick }: { title: "Submit" | "Clear Selection", onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className="w-auto  text-center text-lg font-semibold text-stone-950 flex items-center rounded-full
            px-4 py-2 bg-stone-200 hover:ring-2 hover:ring-stone-100 hover:outline-none"
        >
            {title}
            {title === "Submit" ? <FiArrowRight className="ml-3"/> : null}
        </button>
    )
}
