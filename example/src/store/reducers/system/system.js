import {
    INITIAL_LOAD,
    SET_DATETIME,
} from "./types"

const initialState = {
    datetime: "",
}

const handleInitialLoad = (state, arrayOfData) => {
    let tempState = { ...state }

    arrayOfData.forEach(data => {
        tempState = { ...tempState, list: data.list, _id: data._id, _rev: data._rev }
    })

    return tempState
}

const SystemReducer = (state = initialState, { type, payload }) => {
    if (type === INITIAL_LOAD) {
        return handleInitialLoad(state, payload)
    }

    if (type === SET_DATETIME) {
        return { ...state, datetime: payload }
    }

    return state
}

export default SystemReducer
