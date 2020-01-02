import {
    applyMiddleware,
    compose,
    createStore,
}                                           from "redux"
import thunk                                from "redux-thunk"
import { ReduxPouchDBMiddleware }           from "../../../"
import DatabaseService                      from "../DatabaseService"
import { LogMiddleware }                    from "./middleware"
import reducers                             from "./reducers"
import { initialLoad as initialSystemLoad } from "./reducers/system/actions"
import { initialLoad }                      from "./reducers/todos/actions"

const initialStore = {}
const middleware = []
const enhancers = []

middleware.push(thunk)
middleware.push(LogMiddleware)
middleware.push(ReduxPouchDBMiddleware([
    {
        reducer: "todos",
        verbose: true,
        db: (new DatabaseService("todos-store")).instance(),
        actions: {
            initialInsert: todos => initialLoad(todos),
        },
    },
    {
        reducer: "system",
        verbose: true,
        db: (new DatabaseService("system-store")).instance(),
        actions: {
            initialInsert: system => initialSystemLoad(system),
        },
        excludeKeys: ["datetime"],
    },
]))

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

export default createStore(reducers, initialStore, composedEnhancers)
