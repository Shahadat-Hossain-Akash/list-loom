'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from '@/styles/todo.module.css';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const TodoList = ({todos}) => {
    const router = useRouter()
    const [todosData, setTodosData] = useState(
        todos.map((todo) => ({title: todo.title, todo: todo.todo, isEditing: false, _id: todo._id ,isCrossedOut: false}))
    )
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [editingIndex, setEditingIndex] = useState(null);
    const [isCrossedOut, setIsCrossedOut] = useState(false);

    useEffect(() => {
        setTodosData(todos);
      }, [todos]);

    
    const textTitle = useRef(null)
    const textTodo = useRef(null)
    

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const todo = {
            title: title,
            todo: description
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

    const handleDone= (idx) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].isCrossedOut = !updatedTodosData[idx].isCrossedOut;
        setTodosData(updatedTodosData);
        if(updatedTodosData[idx].isCrossedOut){
            textTitle.current.style.textDecoration = 'line-through'
            textTodo.current.style.textDecoration = 'line-through'
        }
        else{
            textTitle.current.style.textDecoration = 'none'
            textTodo.current.style.textDecoration = 'none'
        }

        
    }

    const handleEditClick = (idx) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].isEditing = true;
        setTodosData(updatedTodosData);
        setEditingIndex(idx);
    };



    const handleSaveClick = (idx) => {
        const updatedTodosData = [...todosData];
        const id = updatedTodosData[idx]._id
        const body = updatedTodosData[idx]
        handleUpdate(id, body)
        updatedTodosData[idx].isEditing = false;
        setTodosData(updatedTodosData);
        setEditingIndex(null);
    };

    const handleCancelClick = (idx) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].isEditing = false;
        setTodosData(updatedTodosData);
        setEditingIndex(null);
    };

    const handleTitleChange = (idx, value) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].title = value;
        setTodosData(updatedTodosData);
    };

    const handleDescChange = (idx, value) => {
        const updatedTodosData = [...todosData];
        updatedTodosData[idx].todo = value;
        setTodosData(updatedTodosData);
    };

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
                                                            onChange={(e) => handleTitleChange(idx, e.target.value)}/>
                                                        <input
                                                            type="text"
                                                            placeholder='Add description'
                                                            value={todo.todo}
                                                            onChange={(e) => handleDescChange(idx, e.target.value)}/>
                                                    </div>
                                                )
                                                : (
                                                    <div className={styles.info_content}>
                                                        <p ref={textTitle}>{todo.title}</p>
                                                        <p ref={textTodo}>{todo.todo}</p>
                                                    </div>
                                                )
                                        }

                                        {
                                            todo.isEditing
                                                ? (
                                                    <div >
                                                    <div className={styles.update_button}>
                                                        <button className={styles.update} onClick={() => handleSaveClick(idx)}>
                                                            <Image src={'/assets/done.svg'} width={25} height={25} alt=''/>
                                                        </button>
                                                        <button  className={styles.update_cancel} onClick={() => handleCancelClick(idx)}>
                                                            <Image src={'/assets/close.svg'} width={25} height={25} alt=''/>
                                                        </button>
                                                    </div>
                                                    </div>
                                                )
                                                : (
                                                    <button disabled={editingIndex !== null || todo.isCrossedOut}className={styles.edit} onClick={() => handleEditClick(idx)}>
                                                        <Image src={'/assets/edit.svg'} width={30} height={30} alt=''/>
                                                    </button>
                                                )
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className={styles.list_right}>
                                <div className={styles.todo_button}>
                                    <button disabled={todo.isEditing} onClick={() => {handleDone(idx), setIsCrossedOut(!isCrossedOut)}}>
                                        <Image src={'/assets/done.svg'} width={100} height={60} alt=''/>
                                    </button>
                                    <button disabled={todo.isEditing} onClick={() => handleDelete(idx)}>
                                        <Image  src={'/assets/close.svg'} width={100} height={60} alt=''/>
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
