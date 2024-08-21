import { ChangeEvent } from "react"

interface LabelledInputBoxType{
    name? : string
    value : string;
    placeholder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type? : string;
}

export const LabelledInputBox = ({name , value , placeholder , onChange , type} : LabelledInputBoxType) => {
    return <div>
         <label className="block mb-1 text-m font-medium text-slate-200 pt-3">{value}</label>
         <input type={type || "text"} name={name ? name : ""} id="first_name" className="bg-stone-500 border border-gray-300 
            text-slate-200 text-m rounded-lg focus:border-stone-100 block w-full p-2.5 dark:bg-stone-900 
            dark:border-stone-500 dark:placeholder-gray-400 dark:text-slate-200 "
              placeholder= {placeholder} onChange={onChange} required />
    </div>
}