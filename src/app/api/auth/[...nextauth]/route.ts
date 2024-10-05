import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth"; // Tipo User de NextAuth

// Define un tipo de usuario personalizado que extienda el User de NextAuth
interface CustomUser extends User {
    tokenJWT: string;
}

// Opciones de NextAuth con tipado correcto
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                const user = await authenticateUser(credentials.email, credentials.password);

                if (user) {
                    return user as CustomUser; // Devolver el usuario tipado como CustomUser
                } else {
                    return null; // Retorna null si la autenticación falla
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const customUser = user as CustomUser;
                token.name = customUser.name;
                token.email = customUser.email;
                token.tokenJWT = customUser.tokenJWT;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                (session.user as CustomUser).tokenJWT = token.tokenJWT as string;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        error: "/login"
    }
} as NextAuthOptions);

export { handler as GET, handler as POST };

// Función de autenticación de usuarios
async function authenticateUser(email: string, password: string) {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,
            password: password
        })
    });

    const data = await response.json();

    if (response.ok && data.token) {
        return { 
            name: "User Name",
            email: email,
            tokenJWT: data.token 
        } as CustomUser;
    }

    return null;
}
