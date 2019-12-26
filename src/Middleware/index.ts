import Middleware          from "./Middleware"
import { MiddlewareProps } from "./types"

export default (props: MiddlewareProps | MiddlewareProps[]) => (new Middleware(props)).handler
