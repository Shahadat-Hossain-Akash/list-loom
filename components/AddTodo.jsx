'use client'
import React, { useState } from 'react'
import styles from '@/styles/todo.module.css'
import Image from 'next/image'
import TodoList from './TodoList'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const AddTodo = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()
    

    const todos = {
        title: title,
        todo: description
    }

    
    const submitHandler = async (e) => {
        e.preventDefault()
        
        try {
            const res = await axios.post(`${process.env.BASE_URL}/api/todo`,todos)
                router.refresh()
                setTitle('');
                setDescription('');
        } catch (error) {
            console.error(error)
        }
        

    }


    return (
        <>
        <div className={styles.container}>
            <form className={styles.input_container} onSubmit={submitHandler}>
                <div className={styles.left} >
                    <div className={styles.input}>
                        <input type="text" placeholder='Add title' value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input type="text" placeholder='Add todo' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                </div>
                <div className={styles.right}>
                <button type="submit" className={styles.submit} ><Image priority alt='' src={'/assets/create.svg'} fill={true} /></button>
                </div>
            </form>
        </div>
        </>
    )
}

export default AddTodo