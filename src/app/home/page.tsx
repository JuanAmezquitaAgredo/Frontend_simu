'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {

  function useCustomHook() {
    const router = useRouter();
    return router;
  }
  
  const { status } = useSession();
  // const { status, data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    useCustomHook().push("/");
  };

  return (
    <div>
      <h3>Home Page</h3>
      {status === "authenticated" && (
        <div>
          <p>page</p>
          <button onClick={handleSignOut}>Signout</button>
          <div>
          </div>
        </div>
      )}
    </div>
  );
}