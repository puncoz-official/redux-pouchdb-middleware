import { createAction } from "redux-actions"
import {
    INITIAL_LOAD,
    SET_DATETIME,
}                       from "./types"

export const setDateTime = createAction(SET_DATETIME)
export const initialLoad = createAction(INITIAL_LOAD)
