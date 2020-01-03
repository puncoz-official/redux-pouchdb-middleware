import PouchDBUtils from "./PouchDBUtils"
import ReduxStates  from "./ReduxStates"
import {
    MiddlewareProps,
    ReduxStatesInterface,
}                   from "./types"
import {
    isArray,
    MiddlewareException,
}                   from "./utils"

abstract class BaseMiddleware {
    public abstract handler(options: any): any

    protected preparePaths = (props: MiddlewareProps | MiddlewareProps[]): ReduxStatesInterface[] => {
        const pathOptions = (isArray(props) ? props : [props]) as MiddlewareProps[]
        if (!pathOptions.length) {
            throw new MiddlewareException("No props defined.")
        }

        return pathOptions.map((option: MiddlewareProps) => {
            return new ReduxStates({
                actions: {...option.actions},
                database: this.initDB(option),
                excludeKeys: option.excludeKeys || [],
                includeKeys: option.includeKeys || [],
                reducer: option.reducer,
                verbose: option.verbose,
            })
        })
    }

    protected initDB = (prop: MiddlewareProps): PouchDBUtils => {
        if (!prop.db) {
            throw new MiddlewareException(`Path options ${prop.reducer} requires a pouch db instance.`)
        }

        return new PouchDBUtils(prop.db)
    }
}

export default BaseMiddleware
