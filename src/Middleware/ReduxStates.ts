import { get as getFromObject } from "lodash"
import PouchDBUtils             from "./PouchDBUtils"
import {
    Actions,
    ReduxStatesInterface,
}                               from "./types"
import {
    log,
    MiddlewareException,
}                               from "./utils"

class ReduxStates implements ReduxStatesInterface {
    public reducer: string = ""
    public database: PouchDBUtils
    public verbose: boolean = false
    public actions: Actions = {
        initialInsert: this.defaultAction("initialInsert"),
    }

    constructor(options: Partial<ReduxStatesInterface>) {
        this.reducer = options.reducer || ""

        if (!options.database) {
            throw new MiddlewareException("DB params should be defined.")
        }

        this.database = options.database
        this.verbose = options.verbose || false
        this.actions = {...this.actions, ...options.actions}
    }

    public propagateInitialInsert(doc: any, dispatch: any) {
        log(this.verbose, "propagateBatchInsert", doc)

        dispatch(this.actions.initialInsert(doc))
    }

    public processNewState(newState: object): void {
        log(this.verbose, "processNewState", newState)
        const doc = getFromObject(newState, this.reducer)

        if (doc) {
            this.database.asyncSave(doc, this.verbose, this.reducer)
        }
    }

    private defaultAction(type: string) {
        return () => {
            throw new MiddlewareException(`No action provided for "${type}"`)
        }
    }
}

export default ReduxStates
