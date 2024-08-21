import axios from "axios";
import { useState } from "react";
import { LabelledInputBox } from "./LabelledInputBox";

interface FormType{
    name : string;
    address : string,
    email : string,
    phone : string , 
    description : string
}

export const Form = () => {

    const [formData, setFormData] = useState<FormType>({
        name: '',
        address: '',
        email: '',
        phone: '',
        description: ''
      });

    const [submitStatus , setSubmitStatus] = useState<string>("");

        const handleChange = (e:any) => {
            const { name, value } = e.target;
            setSubmitStatus("");
            setFormData({
            ...formData,
            [name] : value
            });
        };
  
          
    async function sendDataToServer(formData : FormType){
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.name);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('request_detail', formData.description);

      try {
        const response = await axios.post('https://backend.vericaptcha.live/submit_request', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const message = response.data.message || "";
        setSubmitStatus(message);
      } catch (error) {
        setSubmitStatus("coudln't connect to server, Try again maybe!");
        console.error('Error:', error);
      }
    }
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await sendDataToServer(formData)
      };
    
      const handleFileChange = () => {
        setSubmitStatus("");
      };

      return (
        <div className="h-auto mt-20 mb-20 bg-stone-900 flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-stone-800 rounded-lg shadow-lg">
                <div className="text-center text-2xl font-medium text-stone-200 mb-8">
                    Fill out the details!
                </div>
                <form onSubmit={handleSubmit} className="">
                    <LabelledInputBox name="name"  value="Name" placeholder="your name" onChange={handleChange} />
                    <LabelledInputBox name="address" value="Address" placeholder="your address" onChange={handleChange} />
                    <LabelledInputBox name="email" value="Email" placeholder="123@gmail.com" onChange={handleChange} />
                    <LabelledInputBox name="phone" value="Phone" placeholder="+91 8920791423" onChange={handleChange} />
                    <LabelledInputBox name="description" value="Description" placeholder="Details about your order" onChange={handleChange} />
                    <div className="flex items-center bg-stone-800 mt-6">
                        <label htmlFor="sample" className="mr-4 text-stone-200">Sample:</label>
                        <input
                            type="file"
                            id="sample"
                            name="sample"
                            onChange={handleFileChange}
                            className="bg-stone-200 rounded px-2 py-1 text-stone-900"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Submit
                    </button>
                </form>
                {submitStatus && (
                    <div className="mt-4 text-center text-stone-200">
                        {submitStatus}
                    </div>
                )}
            </div>
        </div>
    );
};
