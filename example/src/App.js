import React        from "react"
import { Provider } from "react-redux"
import { Todos }    from "./components/Todos"
import store        from "./store"

function App() {
    return (
        <Provider store={store}>
            <Todos/>
        </Provider>
    )
}

export default App
