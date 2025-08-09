import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import NewTodoInput from "./NewTodoInput";

export default function Todos() {

    const [todos, setTodos] = useState([
        // {
        //     id: uuidv4(),
        //     title: 'go to school and read book!',
        //     status: false
        // },
        // {
        //     id: uuidv4(),
        //     title: 'go to gym!',
        //     status: true
        // }
    ])





    const addNewTodoHandler = (todoTitle) => {

        let newTodos = [
            ...todos,
            {
                id: uuidv4(),
                title: todoTitle,
                status: false
            }
        ];
        setTodos(newTodos)

        // localStorage.setItem('todos-list', JSON.stringify(newTodos)) //set in localstorage

    }



    const deleteTodoHandler = (todo) => {
        // console.log('delete todo',todo);
        // setTodos([])//همه پاک میشود

        let newTodos = todos.filter((todoItem) => {
            return todo.id != todoItem.id

        })
        // console.log(newTodos);
        setTodos(newTodos);
    }
    const toggleTodoStatusHandler = (todo) => {
        // console.log('toggle todo',todo);
        // let changeTodo=todo;
        // changeTodo.status=!todo.status
        // console.log(changeTodo);


        let newTodos = todos.map((todoItem) => {
            if (todo.id == todoItem.id) {
                todoItem.status = !todoItem.status


            }
            return todoItem;
        })

        // console.log(newTodos);

        setTodos(newTodos);
    }




    const editTodoTitleHandler = (todo, newTitleValue) => {

        let newTodos = todos.map((todoItem) => {
            if (todo.id == todoItem.id) {
                todoItem.title = newTitleValue


            }
            return todoItem;
        })

        setTodos(newTodos);
    }


    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem('todos-list'))??[])
    },[])


    //lifecycle
    // console.log('x'); //با هر تغییر اجرا میشود

    useEffect(() => {
        // console.log('todos update!');
        localStorage.setItem('todos-list', JSON.stringify(todos))
    }, [todos])


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>


                <NewTodoInput addTodo={addNewTodoHandler} />



                <TodoList todos={todos} deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoStatusHandler} editTodoTitle={editTodoTitleHandler} />
            </div>
        </div>
    )

}