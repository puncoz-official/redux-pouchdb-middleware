import {
    INITIAL_LOAD,
    SET_DATETIME,
} from "./types"

const initialState = {
    datetime: "",
}

const handleInitialLoad = (state, data) => {
    return { ...state, list: data.list, _id: data._id, _rev: data._rev }
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
