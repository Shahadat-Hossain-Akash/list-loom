import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { createUser } from "@/backend/controller/userController";

export async function POST(request) {

    try {
    await connectDB()

    const {name, email, password} = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    const res = await createUser({name, email, password: hashedPassword})
        console.log(res)
        if(res !== false){
            return NextResponse.json({success: true}, {status: 201})
            
        }else{
            return NextResponse.json({message: `User exists with email ${email}`}, {status: 409})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    }
}