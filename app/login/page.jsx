import Login from '@/components/Login'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  console.log(session)

  if(session) redirect('/')
  console.log(session)
  return (
    <Login/>
  )
}
