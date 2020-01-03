import { get as getFromObject } from "lodash"
import PouchDBUtils             from "./PouchDBUtils"
import {
    Actions,
    ReduxStatesInterface,
}                               from "./types"
import {
    compareObjects,
    log,
    MiddlewareException,
}                               from "./utils"

class ReduxStates implements ReduxStatesInterface {
    public reducer: string = ""
    public database: PouchDBUtils
    public verbose: boolean = false
    public doc: any = {}
    public excludeKeys: string[] = []
    public includeKeys: string[] = []
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
        this.excludeKeys = options.excludeKeys || []
        this.includeKeys = options.includeKeys || []
        this.actions = {...this.actions, ...options.actions}
    }

    public propagateInitialInsert(doc: any, dispatch: any) {
        log(this.verbose, "propagateInitialInsert", doc)

        if (doc) {
            this.doc = doc
            dispatch(this.actions.initialInsert(doc))
        }
    }

    public processNewState(newState: object): void {
        const doc = getFromObject(newState, this.reducer)

        if (!doc.hasOwnProperty("_id")) {
            doc._id = `${this.reducer}_id`
        }

        let includesDoc = {}
        if (this.includeKeys.length) {
            this.includeKeys.forEach((key: string) => {
                if (doc.hasOwnProperty(key)) {
                    includesDoc = {...includesDoc, [key]: doc[key]}
                }
            })
        } else {
            includesDoc = {...doc}
        }

        includesDoc = {...includesDoc, _id: doc._id}

        this.excludeKeys.forEach((key: string) => {
            delete includesDoc[key]
        })

        log(this.verbose, "processNewState", newState, this.reducer, includesDoc)

        if (!compareObjects(includesDoc, this.doc)) {
            this.doc = includesDoc
            this.database.asyncSave(includesDoc, this.verbose)
        }
    }

    private defaultAction(type: string) {
        return () => {
            throw new MiddlewareException(`No action provided for "${type}"`)
        }
    }
}

export default ReduxStates
