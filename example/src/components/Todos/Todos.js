import React, {
    Fragment,
    useCallback,
    useEffect,
    useState,
} from "react"
import {
    useDispatch,
    useSelector,
} from "react-redux"
import { setDateTime } from "../../store/reducers/system/actions"
import {
    addTodo,
    deleteTodo,
    updateNestedData,
    updateTodo,
} from "../../store/reducers/todos/actions"
import TodoForm from "./TodoForm"
import "./Todos.scss"

const Todos = () => {
    const [showAddForm, setShowAddForm] = useState(false)
    const [editMode, setEditMode] = useState(null)
    const todoList = useSelector(state => state.todos.list)
    const _id = useSelector(state => state.todos._id)
    const datetime = useSelector(state => state.system.datetime)
    const nestedData = useSelector(state => state.todos.nestedData)
    const dispatch = useDispatch()

    useEffect(() => {
        setInterval(() => {
            const date = new Date()

            dispatch(setDateTime(`${date.toDateString()}, ${date.toLocaleTimeString()}`))
        }, 1000)
    }, [])

    const handleAdd = useCallback((todo) => {
        dispatch(addTodo(todo))

        setShowAddForm(false)
        dispatch(updateNestedData({
            en: {
                parent1: {
                    key1: "en.parent1.key1",
                    key2: "en.parent1.key2",
                },
                parent2: {
                    key1: "en.parent2.key1",
                    key2: "en.parent2.key2",
                },
            },
            ne: {
                parent1: {
                    key1: "ne.parent1.key1",
                    key2: "ne.parent1.key2",
                },
                parent2: {
                    key1: "ne.parent2.key1",
                    key2: "ne.parent2.key2",
                },
            },
        }))
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
                <h1>Offline Browsing with data save in Redux/PouchDB with Sync</h1>
            </div>

            <p><strong>Date Time (Saved in pouchdb)</strong>: {datetime}</p>
            <p>Id: {_id}</p>
            <p><strong>Test Neste Data:</strong> {JSON.stringify(nestedData)}</p>

            <hr />

            <h2>Todo</h2>
            <button onClick={() => setShowAddForm(true)}>Add New ToDo</button>
            {showAddForm && <TodoForm onSave={handleAdd} />}

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
                                <TodoForm onSave={(updatedTodo) => handleUpdate(updatedTodo, todo.id)} value={todo.content} />
                            )}

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todos
