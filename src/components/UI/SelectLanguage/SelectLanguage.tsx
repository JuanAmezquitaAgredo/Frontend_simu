'use client'
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Selectlanguage(): React.ReactElement{

    const router = useRouter();

    const HandleClick = (e:any):void=>{
        Cookies.set("locale", e.target.value);
        router.refresh();
    }

    return(
        <div>
            <button value={"en"} onClick={HandleClick}>En</button>
            <button value={"es"} onClick={HandleClick}>Es</button>
        </div>
    )
}