import { isString } from "redux-actions/lib/utils/isString"

const LogMiddleware = () => next => async action => {
    console.info(">>>actions: ", action)

    next(action)

    if (action.type !== "LOG") {
        return
    }

    const payload = action.payload
    console.log(...payload)
}

export default LogMiddleware
