import { createAction } from "redux-actions"
import * as types       from "./types"

export const addTodoItem = createAction(types.ADD_TODO)
export const updateTodo = createAction(types.UPDATE_TODO)
export const deleteTodo = createAction(types.DELETE_TODO)
export const initialLoad = createAction(types.INITIAL_LOAD)

export const log = (...contents) => ({
    type: types.LOG,
    payload: contents,
})

export const addTodo = todo => async (dispatch) => {
    dispatch(log("Adding new Todo"))
    dispatch(addTodoItem(todo))
}
