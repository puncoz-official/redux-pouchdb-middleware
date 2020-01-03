import { combineReducers } from "redux"
import { system }          from "./system"
import { todos }           from "./todos"

export default combineReducers({ todos, system })
