'use client'
import React from "react";
import { FormLogin } from "@/components";
import Selectlanguage from "@/components/UI/SelectLanguage/SelectLanguage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginView(): React.ReactElement{

  const { status, data: session } = useSession();
  function useCustomHook() {
    const router = useRouter();
    return router;
  }

  if(status === "authenticated"){
    useCustomHook().replace("/home")
  }

  return(
    <main>
      <Selectlanguage/>
      <FormLogin/>
    </main>
  )
};