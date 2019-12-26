import Queue      from "queueable-js"
import AsyncQueue from "queueable-js/dist/AsyncQueue"
import {
    PouchDBInterface,
    ReduxStatesInterface,
}                 from "./types"
import { log }    from "./utils"

// tslint:disable-next-line:no-var-requires
const PouchDB = require("pouchdb")

class PouchDBUtils implements PouchDBInterface {
    public db: typeof PouchDB
    public queue: AsyncQueue = Queue(1)

    constructor(db: typeof PouchDB) {
        this.db = db
    }

    instance(): typeof PouchDB {
        return this.db
    }

    public listen(reduxState: ReduxStatesInterface, dispatch: any, initialBatchDispatched: (error: any) => void) {
        this.db.allDocs({include_docs: true}).then((rawAllDocs: any) => {
            const docs = rawAllDocs.rows.map((doc: any) => doc.doc)
            reduxState.propagateInitialInsert(docs, dispatch)

            const changes = this.db.changes({
                include_docs: true,
                live: true,
                since: "now",
            })

            changes.on("change", (change: any) => {
                log(reduxState.verbose, "Change in pouchDB", change)
            })
        }).catch((error: any) => initialBatchDispatched(error))
    }

    public scheduleSave(doc: any, verbose: boolean): void {
        log(verbose, "scheduleSave", doc)

        if (doc.hasOwnProperty("_rev")) {
            this.queue.push(this.update(doc, verbose))
            return
        }

        this.queue.push(this.create(doc, verbose))
    }

    private create(data: any, verbose: boolean): (done: any) => void {
        log(verbose, "create", data)

        return async (done: any) => {
            let error: any
            let response: any

            try {
                response = await this.db.post(data)
            } catch (err) {
                error = err
            }

            log(verbose, "Created", {
                doc: data,
                response,
                type: "create",
            })

            done(error, response)
        }
    }

    private update(data: any, verbose: boolean): (done: any) => void {
        log(verbose, "update", data)

        return async (done: any) => {
            let error: any
            let response: any

            try {
                const doc = await this.db.get(data._id)
                response = await this.db.put({
                    ...data, _id: data._id, _rev: doc._rev,
                })
            } catch (err) {
                error = err
            }

            log(verbose, "Updated", {
                doc: data,
                response,
                type: "update",
            })

            done(error, response)
        }
    }
}

export default PouchDBUtils
