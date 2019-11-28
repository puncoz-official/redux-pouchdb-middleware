const initialState = {
    list: [
        {
            id: 1,
            content: "Test todo",
        }],
}

const generateId = () => Math.random()
                             .toString(36)
                             .substring(7)

const updateArrayById = (arr, id, content) => arr.map(data => {
    if (data.id === id) {
        return { id, content }
    }

    return data
})

const deleteArrayById = (arr, id) => arr.filter(data => data.id !== id)

const TodosReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state, list: [
                    ...state.list, {
                        id: generateId(),
                        content: action.todo,
                    }],
            }

        case "UPDATE_TODO":
            return { ...state, list: updateArrayById(state.list, action.id, action.todo) }

        case "DELETE_TODO":
            return { ...state, list: deleteArrayById(state.list, action.id) }

        default:
            return state
    }
}
export default TodosReducer
