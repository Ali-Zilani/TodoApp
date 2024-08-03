import {TodoProvider} from './TodoContext'
import { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'

function TodoApp() {
    const [todos,setTodos] = useState([])

    const addTodo = (todo)=>{ // todo is object
        setTodos((prevArr)=> [{...todo},...prevArr])
    }
    const updateTodo = (id,todo)=>{
        setTodos((prevArr)=>prevArr.map((prevTodo)=>(
            prevTodo.id === id ? todo : prevTodo
        )))
    }
    const deleteTodo = (id)=>{
        setTodos((prevArr)=>prevArr.filter((prevTodo)=>(
            prevTodo.id !== id  
        )))
    }
    const toggleComplete = (id)=>{
        setTodos((prevArr)=>prevArr.map((prevTodo)=>(
            prevTodo.id === id ? {...prevTodo , completed: !prevTodo.completed } : prevTodo
        )))
    }

    // when application loads it shows stored todos 
    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"))
        if(todos && todos.length>0){
            setTodos(todos)
        }
    }, [])

    // storing in localStorage when any todos added
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todos))
    },[todos])
    
  return (
   <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
     <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
                {
                    todos.map((todo)=>(
                        <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
   </TodoProvider>
  )
}

export default TodoApp