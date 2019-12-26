import PouchDB from "pouchdb"

class DatabaseService {
    constructor(dbName, adapter = "idb") {
        this.db = new PouchDB(dbName, { adapter })
    }

    instance() {
        return this.db
    }
}

export default DatabaseService
