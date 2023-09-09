//Import Redux Core
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

//Import React
import React, { Fragment } from 'react'

export default function ReduxProviderWrapper() {
    return (
        <>
            <Provider store={store}>
                <App />
            </Provider>
        </>
    )
}