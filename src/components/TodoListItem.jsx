import { useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

export default function TodoListItem({ todo, deleteTodo, toggleTodo }) {
    const [editMode, setEditMode] = useState(false);




    return (
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
            {/*  */}





            {
                editMode
                    ?
                    <div className="w-full flex items-center">
                        <input type="text" value={todo?.title} onChange={() => { }} className="w-full px-4 py-2 border border-gray-200 rounded" />
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