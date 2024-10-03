import React from "react";
import Input from "../input/input";

interface GroupInputProps{
    label:string;
    type:string;
    name:string;
    value:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}
export default function GroupInput({label,type, onChange, name, value}:GroupInputProps): React.ReactElement{
    return (
        <div>
            <label>{label}</label>
            <Input type={type} onChange={onChange} name={name} value={value}/>
        </div>
    );
};