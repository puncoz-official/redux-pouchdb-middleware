import React, {
    Fragment,
    useCallback,
    useState,
}               from "react"
import {
    useDispatch,
    useSelector,
}               from "react-redux"
import {
    addTodo,
    deleteTodo,
    updateTodo,
}               from "../../store/reducers/actions"
import TodoForm from "./TodoForm"
import "./Todos.scss"

const Todos = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editMode, setEditMode] = useState(null)
    const todoList = useSelector(state => state.todos.list)
    const _id = useSelector(state => state.todos._id)
    const dispatch = useDispatch()

    const handleAdd = useCallback((todo) => {
        dispatch(addTodo(todo))

        setShowAddForm(false)
    }, [dispatch])

    const handleUpdate = useCallback((todo, id) => {
        dispatch(updateTodo({ todo, id }))

        setEditMode(null)
    }, [dispatch])

    const handleDelete = useCallback((id) => {
        dispatch(deleteTodo(id))

        setEditMode(null)
    }, [dispatch])

    return (
        <div className="todos">
            <div>
                <h1>Redux/PouchDB Sync</h1>
                <button onClick={() => setShowAddForm(true)}>Add</button>
            </div>

            <p>Id: {_id}</p>

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
