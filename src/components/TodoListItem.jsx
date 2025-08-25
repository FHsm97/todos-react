import { useContext, useEffect, useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import { toast } from "react-toastify";
import { TodoContext, TodoDispatcherContext } from "../contexts/TodoContext";

export default function TodoListItem({ todo }) {
    const [editMode, setEditMode] = useState(false);
    const todoDispatcher=useContext(TodoDispatcherContext)


    const editTodoHandler=(event)=>{
        if (event.key=='Enter') {
            // console.log(event.target.value);
            editTodoTitle(todo,event.target.value);
            setEditMode(false)
            
        }
        
    }

    // useEffect(()=>{
    //     console.log(`the component created! =>${todo.title}`);//هنگام ایجاد شدن کامپوننت اجرا می شود

    //     return ()=>{
    //         console.log(`the component deleted! =>${todo.title}`);//زمان حذف کردن کامپوننت اجرا می شود
            
    //     }

        
    // },[])



     const deleteTodoHandler = async (todo) => {


        let res = await fetch(`https://68a198366f8c17b8f5da3e00.mockapi.io/todos/${todo?.id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify()
        })
        if (res.ok) {

            todoDispatcher({
                type:'delete',
                id:todo.id
            })
            

            toast.success('the todo deleted!')

        }
        // show me an error
        let message = await res.json();
        toast.error(message)


    }



    const toggleTodoStatusHandler = async (todo) => {

        let res = await fetch(`https://68a198366f8c17b8f5da3e00.mockapi.io/todos/${todo?.id}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                status: !todo.status
            })
        })

        if (res.ok) {

            todoDispatcher({
                type:'toggle-satus',
                id:todo.id
            })

        }
        // show me an error

    }


    // console.log('toggle todo',todo);
    // let changeTodo=todo;
    // changeTodo.status=!todo.status
    // console.log(changeTodo);







    const editTodoTitleHandler = async (todo, newTitleValue) => {


        let res = await fetch(`https://68a198366f8c17b8f5da3e00.mockapi.io/todos/${todo?.id}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                title: newTitleValue
            })
        })

        if (res.ok) {
            todoDispatcher({
                type:'edit-title',
                id:todo.id,
                newTiltle:newTitleValue
            })
            
        }
        //show me an error




    }



    return (
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
            {/*  */}

            {
                editMode
                    ?
                    <div className="w-full flex items-center">
                        <input type="text" defaultValue={todo?.title} onChange={() => { }} onKeyDown={editTodoHandler} className="w-full px-4 py-2 border border-gray-200 rounded" />
                        <DeleteIcon className="ml-2" onClick={() => setEditMode(false)} />
                    </div>
                    :
                    (
                        <div className="flex items-center">
                            <div>
                                <input type="checkbox" checked={todo?.status} onChange={() => toggleTodo(todo)} className="" />
                                <p className={`inline-block mt-1 ml-2 text-gray-600 ${todo?.status ? 'line-through' : ''}`}>{todo?.title}</p>
                            </div>
                            <button type="button" className="absolute right-0 flex items-center space-x-1">
                                <EditIcon onClick={()=>setEditMode(true)} />
                                <DeleteIcon onClick={() => deleteTodoHandler(todo)} />
                            </button>
                        </div>
                    )
            }
        </li>

    )

}