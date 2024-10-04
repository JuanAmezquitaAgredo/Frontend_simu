"use client";
import GroupInput from "../UI/GroupInput/GroupInput";
import Button from "../UI/Button/Button";
import { IFormData } from "@/types/FormDataInterface";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function FormLogin(): React.ReactElement {
  const router = useRouter();
  const traduction = useTranslations("LoginView");
  const [error, setError] = useState<string | null>(null);
  const initialFormData: IFormData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState<IFormData>(initialFormData);

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    console.log("res", res);

    if (res?.error) {
      setError(res.error);
    } else {
      // Obtener la sesión para extraer los datos del usuario
      const userSession = await fetch("/api/auth/session");
      const sessionData = await userSession.json();
      console.log("Datos de la sesión:", sessionData);

      if (sessionData?.user) {
        const { token, ...userData } = sessionData.user;

        // Guardar token y datos de usuario en sessionStorage
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(userData));

        // Redirigir al usuario a la página de inicio
        router.push("/home");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className={styles.form}>
      <h2>{traduction("title")}</h2>
      <GroupInput
        label={traduction("email")}
        type="email"
        onChange={(e) => handleChange(e)}
        name="email"
        value={formData.email}
      />
      <GroupInput
        label={traduction("password")}
        type="password"
        onChange={(e) => handleChange(e)}
        name="password"
        value={formData.password}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button label={traduction("buttonLogin")} onClick={(e) => handleLogin(e)} />
    </form>
  );
}
