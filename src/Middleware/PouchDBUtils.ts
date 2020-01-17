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

            reduxState.propagateInitialInsert(docs[0] || null, dispatch)

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

    public asyncSave(doc: any, verbose: boolean): void {
        log(verbose, "scheduleSave", doc)

        this.queue.push(this.save(doc, verbose))
    }

    private save(data: any, verbose: boolean): (done: any) => void {
        log(verbose, "update", data)
        const dataToUpdate = {...data}

        return async (done: any) => {
            let error: any
            let response: any

            try {
                const doc = await this.db.get(dataToUpdate._id)

                response = await this.db.put({
                    ...dataToUpdate, _id: dataToUpdate._id, _rev: doc._rev,
                })
            } catch (err) {
                error = err
                response = await this.db.post({...dataToUpdate, _id: dataToUpdate._id})
            }

            log(verbose, "Updated", {
                doc: dataToUpdate,
                response,
                type: "update",
            })

            done(error, response)
        }
    }
}

export default PouchDBUtils
