'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/todo.module.css';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const TodoList = ({ todos, user }) => {

    useEffect(() => {
        (
            async () => {
                const LocomotiveScroll = (await import('locomotive-scroll')).default
                const locomotiveScroll = new LocomotiveScroll();
            }
        )()
    }, [])


    const router = useRouter()
    const [todosData, setTodosData] = useState(
        todos.map((todo) => ({ title: todo.title, description: todo.description, isEditing: false, _id: todo._id, isCrossedOut: false, completed: todo.completed }))
    )
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [editingIndex, setEditingIndex] = useState(null);
    const [disableInput, setDisableInput] = useState(false);


    useEffect(() => {
        setTodosData(todos);
    }, [todos]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const todo = {
            title: title,
            description: description,
            userId: user.user._id
        };

        try {
            const res = await axios.post(`${process.env.BASE_URL}/api/todo`, todo);

            setTitle('');
            setDescription('');
            router.refresh()
        } catch (error) {
            console.error(error);
        }
    };


    const handleUpdate = async (id, body) => {

        try {
            const res = await axios.put(`${process.env.BASE_URL}/api/todo/${id}`, body)
            router.refresh()
        } catch (error) {
            console.log(error)
        }

    }

    const handleDelete = async (idx) => {

        try {
            const id = todosData[idx]._id

            const res = await axios.delete(`${process.env.BASE_URL}/api/todo/${id}`)
            router.refresh()
        } catch (error) {
            console.log(error)
        }

    }


    const handleDone = async (idx) => {
        try {
            const updatedTodosData = [...todosData];
            const id = todosData[idx]._id;
            const body = { completed: !todosData[idx].completed };
            const res = await axios.put(`${process.env.BASE_URL}/api/todo/${id}`, body)
            updatedTodosData[idx] = res.data.updatedTodo;
            setTodosData(updatedTodosData);
            router.refresh()
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditClick = (idx) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].isEditing = true;
        setTodosData(updatedTodosData);
        setEditingIndex(idx);
        setDisableInput(true)
    };



    const handleSaveClick = (idx) => {
        const updatedTodosData = [...todosData];
        const id = updatedTodosData[idx]._id
        const body = updatedTodosData[idx]
        console.log(body)
        handleUpdate(id, body)
        updatedTodosData[idx].isEditing = false;
        setTodosData(updatedTodosData);
        setEditingIndex(null);
        setDisableInput(false)
    };

    const handleCancelClick = (idx) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].isEditing = false;
        setTodosData(updatedTodosData);
        setEditingIndex(null);
        setDisableInput(false)
    };

    const handleTitleChange = (idx, value) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].title = value;
        setTodosData(updatedTodosData);
    };

    const handleDescChange = (idx, value) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].description = value;
        setTodosData(updatedTodosData);
    };


    return (
        <>
            <div className={styles.container}>
                <form className={styles.input_container} onSubmit={submitHandler}>
                    <div className={styles.left} >
                        <div className={styles.input}>
                            <input type="text" placeholder='Add title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input type="text" placeholder='Add todo' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                    </div>
                    <div className={styles.right}>
                        <button aria-label='input_submit' disabled={disableInput === true} type="submit" className={styles.submit} ><Image priority alt='' src={'/assets/create.svg'} fill={true} /></button>
                    </div>
                </form>
            </div>
            <div className={styles.list_container}>
                <div className={styles.todo_container}>
                    {
                        todosData.map((todo, idx) => (
                            <div className={styles.todo} key={idx}>
                                <div className={styles.list_left}>
                                    <div className={styles.todo_card}>
                                        <div className={styles.info}>
                                            {
                                                todo.isEditing
                                                    ? (
                                                        <div className={styles.info_content}>
                                                            <input

                                                                type="text"
                                                                placeholder='Add title'
                                                                value={todo.title}
                                                                onChange={(e) => handleTitleChange(idx, e.target.value)} />
                                                            <input
                                                                type="text"
                                                                placeholder='Add description'
                                                                value={todo.description}
                                                                onChange={(e) => handleDescChange(idx, e.target.value)} />
                                                        </div>
                                                    )
                                                    : (
                                                        <div className={todo.completed ? styles.crossedOut : styles.info_content}>
                                                            <p >{todo.title}</p>
                                                            <p >{todo.description}</p>
                                                        </div>
                                                    )
                                            }

                                            {
                                                todo.isEditing
                                                    ? (
                                                        <div >
                                                            <div className={styles.update_button}>
                                                                <button aria-label='todo_update' className={styles.update} onClick={() => handleSaveClick(idx)}>
                                                                    <Image src={'/assets/done.svg'} width={25} height={25} alt='' />
                                                                </button>
                                                                <button aria-label='todo_close' className={styles.update_cancel} onClick={() => handleCancelClick(idx)}>
                                                                    <Image src={'/assets/close.svg'} width={25} height={25} alt='' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                    : (
                                                        <button aria-label='edit' disabled={editingIndex !== null || todo.completed} className={styles.edit} onClick={() => handleEditClick(idx)}>
                                                            <Image src={'/assets/edit.svg'} width={25} height={25} alt='' />
                                                        </button>
                                                    )
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className={styles.list_right}>
                                    <div className={styles.todo_button}>
                                        <button aria-label='done' disabled={todo.isEditing || editingIndex !== null} onClick={() => handleDone(idx)}>
                                            <Image src={'/assets/done.svg'} fill={true} alt='' />
                                        </button>
                                        <button aria-label='close' disabled={todo.isEditing || editingIndex !== null} onClick={() => handleDelete(idx)}>
                                            <Image src={'/assets/close.svg'} fill={true} alt='' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default TodoList;
