import SignIn from '@/components/SignIn'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if(session) redirect('/')
  return (
    <SignIn/>
  )
}
