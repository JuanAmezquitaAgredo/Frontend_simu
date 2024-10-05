"use client";
import GroupInput from "../UI/GroupInput/GroupInput";
import Button from "../UI/Button/Button";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function FormLogin(): React.ReactElement {
  const router = useRouter();
  const traduction = useTranslations("LoginView");
  const [email, setUseremail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/home");
    }
  };

  
  return (
    <form className={styles.form}>
      <h2>{traduction("title")}</h2>
      <GroupInput
        label={traduction("email")}
        type="email"
        onChange={(e) => setUseremail(e.target.value)}
        name="email"
        value={email}
      />
      <GroupInput
        label={traduction("password")}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        value={password}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button label={traduction("buttonLogin")} onClick={(e) => handleLogin(e)} />
    </form>
  );
}
