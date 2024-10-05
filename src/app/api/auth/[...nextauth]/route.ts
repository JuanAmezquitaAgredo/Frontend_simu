import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

interface User  {
    name: string;
    email: string;
    tokenJWT: string;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | any) {
                const user = await authenticateUser(credentials?.email, credentials?.password);
                if (user) {
                    return user;
                } else {
                    throw new Error("Invalid email or password");
                }
            }
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login"
    },
    callbacks: {
        async jwt({ token, user }:{ token: any, user: User | any}        ) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.tokenJWT = user.tokenJWT;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.tokenJWT = token.tokenJWT as string;
            }
            return session;
        }
    },
    secret: 'd1FE7uWJJr0qkEK3MRtWbnj40Asoiplw6LSxetzPmRo=',
    debug: true,
    session: {
        strategy: "jwt"
    }
})

export { handler as GET, handler as POST }

async function authenticateUser(email: string, password: string) {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: email,  // Cambia esto si "email" no corresponde a "username"
            password: password
        })
    });

    const data = await response.json();

    if (response.ok && data.token) {
        return { 
            id: "1",  // Cambia esto si tienes un ID real que asignar
            email: email,
            tokenJWT: data.token 
        };
    }

    return null;  // Retorna null si no hay un usuario válido
}