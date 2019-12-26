export default class MiddlewareException extends Error {
    constructor(message: string) {
        super(`ReduxPouchDBMiddlewareException: ${message}`)
    }
}
