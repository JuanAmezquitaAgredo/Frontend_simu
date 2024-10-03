import React from "react";

interface ButtonProps{
    label: string;
    onClick: (e:React.FormEvent) => void;
}
export default function Button({label, onClick}: ButtonProps):React.ReactElement{
    return (
        <button onClick={onClick}>{label}</button>
    );
}