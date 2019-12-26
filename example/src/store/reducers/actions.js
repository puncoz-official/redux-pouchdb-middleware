import { createAction } from "redux-actions"
import * as types       from "./types"

export const addTodo = createAction(types.ADD_TODO)
export const updateTodo = createAction(types.UPDATE_TODO)
export const deleteTodo = createAction(types.DELETE_TODO)
export const initialLoad = createAction(types.INITIAL_LOAD)
