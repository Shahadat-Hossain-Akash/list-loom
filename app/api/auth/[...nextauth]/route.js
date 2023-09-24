import User from "@/backend/model/user";
import connectDB from "@/lib/db";
import NextAuth from "next-auth/next";
import bcrypt from 'bcryptjs'

import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions = {
    providers: [
        CredentialsProvider({
            name:'credentials',
            credentials: {},

            async authorize(credentials){
                const {email, password} = credentials

                try {
                    await connectDB()

                const user = await User.findOne({email})

                if(!user){
                    return null
                }

                const passwordMatched = await bcrypt.compare(password, user.password)

                if(!passwordMatched){
                    return null
                }
                return user
                } catch (error) {
                    console.log(error)
                }
                

            }
        })
    ],
    session:{
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin'
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}