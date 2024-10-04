import React from "react";
import Input from "../input/input";
import styles from "./styles.module.css"

interface GroupInputProps{
    label:string;
    type:string;
    name:string;
    value:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}
export default function GroupInput({label,type, onChange, name, value}:GroupInputProps): React.ReactElement{
    return (
        <div className={styles.div}>
            <label>{label}</label>
            <Input type={type} onChange={onChange} name={name} value={value}/>
        </div>
    );
};