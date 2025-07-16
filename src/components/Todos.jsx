import { useState } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

export default function Todos() {

    const [todos, setTodos] = useState([
        {
            id:uuidv4(),
            title: 'go to school and read book!',
            status: false
        },
        {
            id:uuidv4(),
            title: 'go to gym!',
            status: true
        }
    ])

    const [newTodoTitle,setNewTodoTitle]=useState("")

    const onInputNewTodoChanageHandler = (event) => {
        // console.log(event);
        setNewTodoTitle(event.target.value)

    }

    const addNewTodoHandler=(event)=>{
        // console.log(event.key);
        if(event.key=='Enter'&& newTodoTitle!=""){
            // console.log('add a new todo');
            setTodos([
                ...todos,
                {
                    // title:event.target.value,
                    id:uuidv4(),
                    title:newTodoTitle,
                    status:false
                }
            ])

            setNewTodoTitle("")

            // event.target.value='';
            

        }
        // console.log(event.target.value);      
    }

    const deleteTodoHandler=(todo)=>{
        // console.log('delete todo',todo);
        // setTodos([])//همه پاک میشود

        let newTodos=todos.filter((todoItem)=>{
            return todo.id!=todoItem.id

        })
        // console.log(newTodos);
        setTodos(newTodos);
    }
    const toggleTodoStatusHandler=(todo)=>{
        // console.log('toggle todo',todo);
        // let changeTodo=todo;
        // changeTodo.status=!todo.status
        // console.log(changeTodo);
        

        let newTodos=todos.map((todoItem)=>{
            if(todo.id==todoItem.id){
                todoItem.status=!todoItem.status
                

            }
            return todoItem;
        })

        // console.log(newTodos);
        
        setTodos(newTodos);
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                <div className="flex items-center mb-6">
                    <h1 className="mr-6 text-4xl font-bold text-purple-600"> TO DO APP</h1>
                </div>
                <div className="relative">
                    <input type="text" placeholder="What needs to be done today?"
                        onChange={onInputNewTodoChanageHandler}
                        onKeyDown={addNewTodoHandler}
                        value={newTodoTitle}
                        className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
                </div>
                <TodoList todos={todos} deleteTodo={deleteTodoHandler} toggleTodo={toggleTodoStatusHandler} />
            </div>
        </div>
    )

}