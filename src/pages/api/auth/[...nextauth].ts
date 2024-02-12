import { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "../../../../prisma/client";
import NextAuth from "next-auth/next";


type LoginRequest = {
    username: string,
    password: string
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            
            //@ts-ignore
            async authorize(credentials: LoginRequest) {
                try {
  
                    const user = await prisma.user.login(credentials?.username, credentials?.password);
                    
                    if(user) {
                        return {
                            name: user.username,
                        };
                    }
                } catch(err) {
                    if(err instanceof Error) {
                        throw new Error(err.message);
                    }
                }
            }
        })
    ],
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60
    }
}

export default NextAuth(authOptions);