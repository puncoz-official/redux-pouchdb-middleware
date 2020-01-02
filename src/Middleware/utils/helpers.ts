import { isEqual } from "lodash"

export const isArray = (arr: any): boolean => Array.isArray(arr)

export const log = (verbose: boolean, ...argv: any): void => {
    if (verbose) {
        console.log("ReduxPouchDBMiddlewareInfo", ...argv)
    }
}

export const compareObjects = (object1: any, object2: any): boolean => {
    return isEqual(object1, object2)
}
