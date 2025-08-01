import { useEffect, useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

export default function TodoListItem({ todo, deleteTodo, toggleTodo,editTodoTitle }) {
    const [editMode, setEditMode] = useState(false);
    const editTodoHandler=(event)=>{
        if (event.key=='Enter') {
            // console.log(event.target.value);
            editTodoTitle(todo,event.target.value);
            setEditMode(false)
            
        }
        
    }

    useEffect(()=>{
        console.log(`the component created! =>${todo.title}`);//هنگام ایجاد شدن کامپوننت اجرا می شود

        return ()=>{
            console.log(`the component deleted! =>${todo.title}`);//زمان حذف کردن کامپوننت اجرا می شود
            
        }

        
    },[])



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
                                <DeleteIcon onClick={() => deleteTodo(todo)} />
                            </button>
                        </div>
                    )
            }
        </li>

    )

}