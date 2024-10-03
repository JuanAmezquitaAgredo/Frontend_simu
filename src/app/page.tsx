import React from "react";
import { FormLogin } from "@/components";
import Selectlanguage from "@/components/UI/SelectLanguage/SelectLanguage";

export default function LoginView(): React.ReactElement{

  return(
    <main>
      <Selectlanguage/>
      <FormLogin/>
    </main>
  )
};