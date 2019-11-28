import {
    applyMiddleware,
    compose,
    createStore,
}               from "redux"
import reducers from "./reducers"

const initialStore = {}
const middleware = []
const enhancers = []

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

export default createStore(reducers, initialStore, composedEnhancers)
