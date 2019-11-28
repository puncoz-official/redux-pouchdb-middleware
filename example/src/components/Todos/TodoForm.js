import React, {
    useCallback,
    useState,
} from "react"

const TodoForm = ({ onSave, value = "" }) => {
    const [todo, setTodo] = useState(value)

    const onChangeHandler = useCallback((event) => {
        setTodo(event.target.value)
    }, [])

    return (
        <div>
            <input type="text" value={todo} onChange={onChangeHandler}/>
            <button onClick={() => onSave(todo)}>Save</button>
        </div>
    )
}

export default TodoForm
