import Todo from "../model/todo"

export const getAllTodo = async () => {

    const todos = await Todo.find()

    return todos
}

export const getSingleTodo = async (id) => {

    const todo = await Todo.findById(id)

    if (!todo) {
        return null
    }

    return todo
}

export const createTodo = async (title, todo) => {

    const newTodo = await Todo.create({title, todo})

    return newTodo

}

export const updateTodo = async (id, {title, todo}) => {

    const updated = await Todo.findByIdAndUpdate(id, {
        title,
        todo
    },{new: true});

    return updated;
}

export const deleteTodo = async (id) => {

    const deletedTodo = await Todo.findByIdAndDelete(id)

    return deletedTodo

}