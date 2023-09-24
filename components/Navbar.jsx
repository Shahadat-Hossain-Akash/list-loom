'use client'
import React, {useEffect, useState} from 'react'
import styles from '@/styles/navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Navbar = ({user}) => {
    const [users, setUser] = useState(true)
    const [dark, setdark] = useState(false)

    console.log(user)

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                To Do List
            </div>
            <div className={styles.info}>
                <div className={styles.user}>
                    {
                        users
                            ? <div>
                            <div className={styles.logged}>
                            <div className={styles.profile}><p>{user.user?.name.substring(0,2)}</p></div> <button onClick={() => signOut()}><Image src = {'/assets/logout.svg'} alt = '' width = {35} height = {35}/> </button>
                            </div>
                            
                            </div>
                            : <> 
                            <Link href={'/signin'} style={{color: 'inherit',textDecoration:'none'}}>

                            <Image src = {'/assets/signin.svg'} alt = '' width = {30} height = {30}/> </Link>
                            <Link href={'/login'} style={{color: 'inherit',textDecoration:'none'}}>
                            <Image src={'/assets/login.svg'} alt='' width={30} height={30}/></Link>
                            </>
                    }
                </div>
                <div className={styles.mode}>
                    {
                        dark
                            ? <div className={styles.dark}>
                                    <Image src={'/assets/mode.svg'} alt='' fill={true}/>
                                </div>
                            : <div className={styles.light}>
                                <Image src={'/assets/mode.svg'} alt='' fill={true}/>
                                </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar