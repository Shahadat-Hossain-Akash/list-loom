
import styles from './page.module.css'
import './globals.css'
import Navbar from '@/components/Navbar'
import TodoList from '@/components/TodoList'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const getTodos = async () => {
  const {data} = await axios.get(`${process.env.BASE_URL}/api/todo`)

  return data.todos
}


export default async function Home() {

  const todos = await getTodos()
  console.log(todos)

  const user = await getServerSession(authOptions)
  
  return (
    <main className={styles.main}>
      <Navbar user={user}/>
      <TodoList todos={todos}/>
    </main>
  )
}

