import { useEffect, useReducer, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";
import { toast } from "react-toastify";
import todoReducer from "../reducers/todoReducer";
import { TodoContext } from "../contexts/TodoContext";

export default function Todos() {

    // const [todos, setTodos] = useState([])

    const [todos, todoDispatcher] = useReducer(todoReducer, [])





    const addNewTodoHandler = async (todoTitle) => {

        // setTodos(newTodos)

        // localStorage.setItem('todos-list', JSON.stringify(newTodos)) //set in localstorage


        try {

            let res = await fetch("https://68a198366f8c17b8f5da3e00.mockapi.io/todos", {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    title: todoTitle,
                    status: false
                })
            })

            let todoData = await res.json();

            // console.log(res);

            todoDispatcher({
                type: 'add',
                id: todoData?.id,
                title: todoData?.title
            })

            toast.success("todo created!")


        } catch (error) {
            console.log(error);


        }

    }







    const getTodosFromApi = async () => {
        try {
            let res = await fetch("https://68a198366f8c17b8f5da3e00.mockapi.io/todos")
            let todos = await res.json();

            // console.log(todos);
            if (res.ok) {
                todoDispatcher({
                    type: 'initial-todos',
                    todos
                })
            }


        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getTodosFromApi();
        // setTodos(JSON.parse(localStorage.getItem('todos-list'))??[])
    }, [])


    // //lifecycle
    // // console.log('x'); //با هر تغییر اجرا میشود

    // useEffect(() => {
    //     // console.log('todos update!');
    //     localStorage.setItem('todos-list', JSON.stringify(todos))
    // }, [todos])


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>


                <NewTodoInput addTodo={addNewTodoHandler} />

                <TodoContext.Provider value={{
                    todos,
                    todoDispatcher
                }}>
                    <TodoList />
                </TodoContext.Provider>




            </div>
        </div>
    )

}