import captchaIcon from "../assets/delivery-image.png"
import customData from "../assets/pick-meals-image.png"
import image from "../assets/choose-image.png"

export const Work = () => { 
    return (
        <div className="h-auto bg-stone-900 pb-10 mt-20 flex flex-col items-center justify-center space-y-10">
            <div className="text-center mx-20 lg:mx-80">
                <h2 className="text-orange-500 font-semibold text-2xl mb-2">Work</h2>
                <h1 className="text-4xl lg:text-4xl font-bold text-stone-100 mb-4">
                        How does it work?
                </h1>
                <p className="mt-6 text-stone-400 text-xl font-medium mb-4 w-5/6 mx-auto">
                When the user orders any type of data, the data gets collected manually then it gets fed across 
                all the captcha service to label it. The CAPTCHA service is used to label the dataset which is further gets
                delivered to the requested user
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
                <Card
                    title="Order custom data"
                    description="order any type of data according to your needs" 
                    imagePath={customData}
                />
                <Card
                    title="Choose Captcha"
                    description="The captcha service is used to label the ordered dataset." 
                    imagePath={captchaIcon}
                />
                <Card
                    title="Delivering the dataset"
                    description="Once the dataset is labelled, it is sent to the owner" 
                    imagePath={image}
                />
            </div>
        </div>
    );
}

interface CardProps {
    title: string;
    description: string;
    imagePath: string;
  }
  
  const Card: React.FC<CardProps> = ({ title, description, imagePath }) => {
    return (
      <div className="mb-20 lg:mb-0 bg-stone-800 rounded-xl mx-10 py-6  flex flex-col justify-center items-center">
        <div className="flex justify-center">
          <img
            src={imagePath}
            alt="Card Icon"
            className="w-40 object-contain"
          />
        </div>
        <div className="mt-10 text-stone-200 text-center text-2xl font-bold">
            {title}
        </div>
        <div className="text-stone-300 text-center mx-6 text-lg mt-2 max-w-60">{description}</div>
      </div>
    );
  };