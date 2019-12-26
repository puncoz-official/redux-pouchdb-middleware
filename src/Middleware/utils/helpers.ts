export const isArray = (arr: any): boolean => Array.isArray(arr)

export const log = (verbose: boolean, ...argv: any): void => {
    if (verbose) {
        console.log("ReduxPouchDBMiddlewareInfo", ...argv)
    }
}
