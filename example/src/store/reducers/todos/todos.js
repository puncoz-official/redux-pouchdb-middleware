import * as types from "./types"

const initialState = {
    list: [
        {
            id: 1,
            content: "Test",
        },
    ],
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

const handleInitialLoad = (state, arrayOfData) => {
    let tempState = { ...state }

    arrayOfData.forEach(data => {
        tempState = { ...tempState, list: data.list, _id: data._id, _rev: data._rev }
    })

    return tempState
}

const TodosReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case types.INITIAL_LOAD:
            return handleInitialLoad(state, payload)

        case types.ADD_TODO:
            return {
                ...state, list: [
                    ...state.list, {
                        id: generateId(),
                        content: payload,
                    }],
            }

        case types.UPDATE_TODO:
            return { ...state, list: updateArrayById(state.list, payload.id, payload.todo) }

        case types.DELETE_TODO:
            return { ...state, list: deleteArrayById(state.list, payload) }

        default:
            return state
    }
}
export default TodosReducer
