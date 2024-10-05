'use client'
import React from "react";
import { FormLogin } from "@/components";
import Selectlanguage from "@/components/UI/SelectLanguage/SelectLanguage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginView(): React.ReactElement{

  const { status, data: session } = useSession();
  const router = useRouter();

  if(status === "authenticated"){
    router.replace("/home")
  }

  return(
    <main>
      <Selectlanguage/>
      <FormLogin/>
    </main>
  )
};