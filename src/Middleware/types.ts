import PouchDB      from "pouchdb"
import PouchDBUtils from "./PouchDBUtils"

export type CallBack = (...args: any) => void

export type Handler = (err: any, data: any, cb: CallBack) => void

export interface Actions {
    initialInsert: (params: any) => void
}

export interface ReduxStatesInterface {
    reducer: string
    database: PouchDBUtils
    actions: Actions
    verbose: boolean

    propagateInitialInsert: (doc: any, dispatch: any) => void
    processNewState: (newState: object) => void
}

export interface PouchDBInterface {
    db: typeof PouchDB
    listen: (reducer: ReduxStatesInterface, dispatch: any, initialBatchDispatched: (error: any) => void) => void
    scheduleSave: (docs: any, withLog: boolean) => void
}

export interface MiddlewareProps extends Partial<ReduxStatesInterface> {
    reducer: string
    db: any
    verbose: boolean
    actions: Actions
}
