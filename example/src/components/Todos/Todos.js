import React, {
    Fragment,
    useCallback,
    useState,
}               from "react"
import {
    useDispatch,
    useSelector,
}               from "react-redux"
import TodoForm from "./TodoForm"
import "./Todos.scss"

const Todos = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editMode, setEditMode] = useState(0)
    const todoList = useSelector(state => state.todos.list)
    const dispatch = useDispatch()

    const handleAdd = useCallback((todo) => {
        dispatch({
            type: "ADD_TODO",
            todo,
        })

        setShowAddForm(false)
    }, [dispatch])

    const handleUpdate = useCallback((todo, id) => {
        dispatch({
            type: "UPDATE_TODO",
            todo, id,
        })

        setEditMode(0)
    }, [dispatch])

    const handleDelete = useCallback((id) => {
        dispatch({
            type: "DELETE_TODO",
            id,
        })

        setEditMode(0)
    }, [dispatch])

    return (
        <div className="todos">
            <div>
                <h1>Todo List</h1>
                <button onClick={() => setShowAddForm(true)}>Add</button>
            </div>

            {showAddForm && <TodoForm onSave={handleAdd}/>}

            <ul>
                {todoList && todoList.map(todo => (
                    <li key={todo.id}>
                        {editMode !== todo.id ? (
                            <Fragment>
                                <span>{todo.content}</span>
                                <span className="action" onClick={() => setEditMode(todo.id)}> Edit </span>
                                <span className="action" onClick={() => handleDelete(todo.id)}> Delete </span>
                            </Fragment>
                        ) : (
                            <TodoForm onSave={(updatedTodo) => handleUpdate(updatedTodo, todo.id)} value={todo.content}/>
                        )}

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todos
