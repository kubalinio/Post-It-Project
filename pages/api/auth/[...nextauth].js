import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '../../../prisma/index'

// Logowanie
export const AuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    
    // Configure one or more authentication providers
    providers: [
        //  Google provider
        GoogleProvider({
            name: 'google',
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        
    ],
};
export default NextAuth(AuthOptions);
