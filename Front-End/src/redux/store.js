// Load Redux Toolkit
import {configureStore} from "@reduxjs/toolkit";

// Load customized Theme from slice
import customizationReducer from "./slices/theme-related/customizationSlice";
import messagesFromUserAndServerReducer from "./slices/message-related/messageSlice";


export const store = configureStore({
    reducer:{
        customization: customizationReducer,
        messagesFromUserAndServer: messagesFromUserAndServerReducer
    }
});