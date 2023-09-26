import styles from './page.module.css'
import './globals.css'
import Navbar from '@/components/Navbar'
import TodoList from '@/components/TodoList'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Suspense } from 'react'
import Loading from './loading'

const getTodos = async () => {
  const session = await getServerSession(authOptions)
  const userId = session.user._id
  const { data } = await axios.get(`${process.env.BASE_URL}/api/todo/${userId}`)

  return data.todo
}

export default async function Home() {

  const todos = await getTodos()

  const session = await getServerSession(authOptions)

  return (
    <main className={styles.main}>
      <Navbar user={session} />
      <Suspense fallback={<Loading />}>
        <TodoList todos={todos} user={session} />
      </Suspense>
    </main>
  )
}
