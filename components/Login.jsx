'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const res = await signIn('credentials', {email, password , redirect: false})
        if(res.error){
            setError("Invalid credentials")
            return
        }
        console.log(res)
        router.replace('/')
    } catch (error) {
        console.log(error)
    }
  }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
            <div className={styles.title}>Login</div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <div className={styles.wrap}>
                    <Image src = {'/assets/email.svg'} alt = '' width = {25} height = {25}/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Enter your email'/>
                    </div>
                    <div className={styles.wrap}>
                    <Image src = {'/assets/password.svg'} alt = '' width = {25} height = {25}/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password'/>
                    </div>
                    {error && <div className={styles.wrap}>
                      <p>{error}!!</p>
                    </div>}
                </div>
                <button className={styles.button} type='submit'>Login</button>
            </form>
            <div className={styles.signup}>Don't have an account, {" "}<Link style={{color:'inherit'}} href={'/signin'}> Signup</Link></div>
            <div className={styles.forgot}>Forgot your pasword</div>
        </div>
        </div>
    )
}

export default Login