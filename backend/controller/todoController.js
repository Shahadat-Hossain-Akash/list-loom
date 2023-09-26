import Todo from "../model/todo"

export const getTodoByUser = async (id) => {

    const todo = await Todo.find({ user: id })

    if (!todo) {
        return null
    }

    return todo
}

export const createTodo = async (title, description, userId) => {

    const newTodo = await Todo.create({ title, description, user: userId })

    return newTodo

}

export const updateTodo = async (id, { title, description, completed }) => {

    const updated = await Todo.findByIdAndUpdate(id, {
        title,
        description,
        completed
    }, { new: true });

    return updated;
}

export const deleteTodo = async (id) => {

    const deletedTodo = await Todo.findByIdAndDelete(id)

    return deletedTodo

}