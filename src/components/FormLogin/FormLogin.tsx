"use client"
import GroupInput from "../UI/GroupInput/GroupInput";
import Button from "../UI/Button/Button";
import { IFormData } from "@/types/FormDataInterface";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function FormLogin():React.ReactElement{
    const traduction = useTranslations("LoginView");
    const {data:session} = useSession();
    const initialFormData: IFormData = {
        email: "",
        password: ""
    };
    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const handleLogin = async(e:React.FormEvent):Promise<void> =>{
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });
        console.log("res", res);
        console.log(session?.user);
    };
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    }
    return(
        <form>
            <h2>{traduction("title")}</h2>
            <GroupInput label={traduction("email")} type="email" onChange={(e)=>handleChange(e)} name="email" value={formData.email} />
            <GroupInput label={traduction("password")} type="password" onChange={(e)=>handleChange(e)} name="password" value={formData.password} />
            <Button label={traduction("buttonLogin")} onClick={(e)=>handleLogin(e)} />
        </form>
    )
}