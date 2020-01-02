import {
    applyMiddleware,
    compose,
    createStore,
}                                 from "redux"
import thunk                      from "redux-thunk"
import { ReduxPouchDBMiddleware } from "../../../"
import DatabaseService            from "../DatabaseService"
import { LogMiddleware }          from "./middleware"
import reducers                   from "./reducers"
import { initialLoad }            from "./reducers/actions"

const initialStore = {}
const middleware = []
const enhancers = []

middleware.push(thunk)
middleware.push(LogMiddleware)
middleware.push(ReduxPouchDBMiddleware({
    reducer: "todos",
    verbose: true,
    db: (new DatabaseService("todos-store")).instance(),
    actions: {
        initialInsert: todos => initialLoad(todos),
    },
}))

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

export default createStore(reducers, initialStore, composedEnhancers)
