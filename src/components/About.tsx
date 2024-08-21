import image from "../assets/about-background-image.png"; 

export const About = () => {
    return (
        <div className="h-auto mt-20 flex flex-col items-center justify-center space-y-10">
            <div className="text-center mx-20 lg:mx-80">
                <h2 className="text-orange-500 font-semibold text-lg mb-2">About</h2>
                <h1 className="text-4xl lg:text-4xl font-bold text-stone-100 mb-4">
                    Data is unarguably the most valuable thing in the world right now!
                </h1>
                <p className="text-stone-400 text-xl font-medium mb-4 w-4/5 mx-auto">
                    In today's digital age, CAPTCHA systems are essential for protecting websites from bots and automated abuse.
                    However, traditional CAPTCHA solutions can be cumbersome and frustrating for users. At the same time, there's
                    a growing demand for high-quality labeled datasets to train artificial intelligence models, which are crucial
                    for advancements in technology and automation.
                </p>
                <ul className="list-disc list-inside text-stone-400 text-xl">
                    <li className="mb-2">
                        <span className="font-bold">User-Friendly CAPTCHA : </span>
                        Our system is easy to use and secure, ensuring genuine users can navigate easily while blocking bots.
                    </li>
                    <li>
                        <span className="font-bold">Data Labeling :</span>
                        We generate high-quality labeled datasets through our CAPTCHA system, essential for training AI models.
                    </li>
                </ul>
            </div>
            <div className="flex justify-center">
                <img src={image} alt="Illustration" className="w-auto max-w-xs lg:max-w-xs" />
            </div>
        </div>
    );
}
