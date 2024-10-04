import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extender la interfaz de User para incluir el token
interface ExtendedUser extends User {
  token: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<ExtendedUser | null> {
        const { email, password } = credentials || {};
        console.log("Credenciales:", email, password);
        
        // Verificar si email y password están presentes
        if (!email || !password) {
          console.log("Email o contraseña no proporcionados.");
          return null;
        }

        try {
          const userLogin = await login(email, password);
          console.log("Respuesta del backend:", userLogin);

          // Verificar que la respuesta contiene el usuario y el token
          if (!userLogin || !userLogin.user || !userLogin.token) {
            console.log("Usuario o token no encontrados en la respuesta.");
            return null;
          }

          return {
            ...userLogin.user, 
            token: userLogin.token 
          };
        } catch (error) {
          console.log("Error en el proceso de autorización:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

async function login(email: string, password: string) {
  try {
    const response = await fetch("https://simuate-test-backend-1.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Error con la respuesta: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos recibidos del backend:", data);
    
    if (!data || !data.user || !data.token) {
      throw new Error("La respuesta no contiene un usuario o token válido.");
    }

    return data;
  } catch (error: unknown) {
    console.error("Error con el login:", error);
  }
}

export { handler as GET, handler as POST };
