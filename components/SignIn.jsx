'use client'
import React, { useState } from 'react'
import styles from '@/styles/auth.module.css'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const SignIn = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const router  = useRouter()


  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!name || !email || !password){
      setErrorText('All fields are needed!!')
      setError(true)
    }
    try {
      const res = await axios.post(`${process.env.BASE_URL}/api/register`,{name, email,password})
      console.log(res)
      if(res.data.success){
        setName('')
        setEmail('')
        setPassword('')
        router.push('/login')
      }
      else{
        console.log('registration failed')
      }
    } catch (error) {
      console.log(error)
      setError(true)
      setErrorText(error.response.data.message)
      setTimeout(() => {
        setError(false)
        setName('')
        setPassword('')
      }, 3500);
    }
  }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
            <div className={styles.title}>Sign Up</div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                <div className={styles.wrap}>
                    <Image src = {'/assets/name.svg'} alt = '' width = {25} height = {25}/>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter your name' />
                    </div>
                    <div className={styles.wrap}>
                    <Image src = {'/assets/email.svg'} alt = '' width = {25} height = {25}/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Enter your email' />
                    </div>
                    <div className={styles.wrap}>
                    <Image src = {'/assets/password.svg'} alt = '' width = {25} height = {25}/>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter your password' />
                    </div>
                    {error && <div className={styles.wrap}>
                      <p>{errorText}</p>
                    </div>}
                </div>
                <button type='submit' className={styles.button} >Create account</button>
            </form>
            <div className={styles.signup}>Already have an account,<Link style={{color:'inherit'}} href={'/login'}> Login</Link></div>
        </div>
        </div>
    )
}

export default SignIn