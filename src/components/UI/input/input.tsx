import React from "react";

interface InputProps{
    type:string
    name:string
    value:string
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
}
export default function Input({type, onChange, name, value}:InputProps):React.ReactElement{
    return(
        <input type={type} onChange={onChange} name={name} value={value}/>
    )
}