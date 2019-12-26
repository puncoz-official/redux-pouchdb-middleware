import BaseMiddleware from "./BaseMiddleware"
import {
    MiddlewareProps,
    ReduxStatesInterface,
}                     from "./types"

class Middleware extends BaseMiddleware {
    private readonly paths: ReduxStatesInterface[]

    constructor(props: MiddlewareProps | MiddlewareProps[] = []) {
        super()

        this.paths = this.preparePaths(props)
        this.handler = this.handler.bind(this)
    }

    getProps() {
        return this.paths
    }

    handler(options: any): any {
        this.paths.forEach((reduxStates: ReduxStatesInterface) => {
            reduxStates.database.listen(reduxStates, options.dispatch, (error: any) => {
                throw error
            })
        })

        return (next: any) => (action: any) => {
            const returnValue = next(action)
            const newState = options.getState()

            this.paths.forEach((reduxStates: ReduxStatesInterface) => reduxStates.processNewState(newState))

            return returnValue
        }
    }
}

export default Middleware
