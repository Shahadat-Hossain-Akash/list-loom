import { deleteTodo, getSingleTodo, getTodoByUser, updateTodo } from "@/backend/controller/todoController";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db"

export async function GET(req, { params }) {
    try {

        await connectDB();

        const id = params.id
        const todo = await getTodoByUser(id)

        return NextResponse.json({
            message: "Todo by user",
            todo
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Error",
            error
        }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {

        await connectDB();

        const id = params.id

        const { title, description, completed } = await request.json()

        const updatedTodo = await updateTodo(id, { title, description, completed })

        return NextResponse.json({
            message: "Todo updated",
            updatedTodo
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: error
        }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {

        await connectDB();

        const id = params.id

        const todo = await deleteTodo(id)

        return NextResponse.json({
            success: true
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            message: "Error",
            error
        }, { status: 500 });
    }
}
