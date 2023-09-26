import { createTodo, getAllTodo } from "@/backend/controller/todoController";
import connectDB from "@/lib/db"
import { NextResponse } from 'next/server'


export async function POST(request) {

    try {
        await connectDB()

        const { title, description, userId } = await request.json()

        console.log(title, description, userId)

        const data = await createTodo(title, description, userId)

        return NextResponse.json({ message: 'Todo created successfully', data }, { status: 201 })

    } catch (error) {
        return NextResponse.json({
            message: "Error",
            error
        }, { status: 500 });
    }
}

