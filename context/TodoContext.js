'use client'
import { createContext, useState } from "react";

export const TodoContext = createContext()

export const TodoProvider = ({children}) => {
    const [todo, setTodo] = useState([])

    


    return (
        <TodoContext.Provider value={{todo}}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext

