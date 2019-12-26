import {
    applyMiddleware,
    compose,
    createStore,
}                                 from "redux"
import { ReduxPouchDBMiddleware } from "../../../"
import DatabaseService            from "../DatabaseService"
import reducers                   from "./reducers"
import { initialLoad }            from "./reducers/actions"

const initialStore = {}
const middleware = []
const enhancers = []

middleware.push(ReduxPouchDBMiddleware({
    reducer: "todos",
    verbose: false,
    db: (new DatabaseService("todos-store")).instance(),
    actions: {
        initialInsert: todos => initialLoad(todos),
    },
}))

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

export default createStore(reducers, initialStore, composedEnhancers)
