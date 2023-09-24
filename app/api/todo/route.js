import {createTodo, getAllTodo} from "@/backend/controller/todoController";
import connectDB from "@/lib/db"
import {NextResponse} from 'next/server'

export async function GET() {
    try {

        await connectDB();

        const todos = await getAllTodo()

        return NextResponse.json({
            message: "Todos",
            todos
        }, {status: 200})

    } catch (error) {
        return NextResponse.json({
            message: "Error",
            error
        }, {status: 500});
    }
}

export async function POST(request) {

    try {
        await connectDB()

        const {title, todo} = await request.json()

        console.log(title, todo)

        const data = await createTodo(title, todo)

        return NextResponse.json({message: 'Todo created successfully', data}, {status: 201})

    } catch (error) {
      return NextResponse.json({
        message: "Error",
        error
    }, {status: 500});
    }
}

