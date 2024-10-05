'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  
  const router = useRouter();
  const { status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div>
      <h3>Home Page</h3>
      {status === "authenticated" && (
        <div>
          <p>page</p>
          <button onClick={handleSignOut}>Signout</button>
        </div>
      )}
    </div>
  );
}
