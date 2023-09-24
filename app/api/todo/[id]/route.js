import { deleteTodo, getSingleTodo, updateTodo } from "@/backend/controller/todoController";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db"



export async function GET(req, {params}) {
    try {

        await connectDB();

        const id =  params.id

        const todo = await getSingleTodo(id)

        return NextResponse.json({
            message: "Todo",
            todo
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            message: "Error",
            error
        }, {status: 500});
    }
}

export async function PUT(request, {params}) {
    try {

        await connectDB();

        const id =  params.id

        const {title, todo} = await request.json()


        const updatedTodo = await updateTodo(id, {title, todo})

        return NextResponse.json({
            message: "Todo updated",
            updatedTodo
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            message: error,
            
        }, {status: 500});
    }
}

export async function DELETE(req, {params}) {
    try {

        await connectDB();

        const id =  params.id

        const todo = await deleteTodo(id)

        return NextResponse.json({
            success: true,
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            message: "Error",
            error
        }, {status: 500});
    }
}





