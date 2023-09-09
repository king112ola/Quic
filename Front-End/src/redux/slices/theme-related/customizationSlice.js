//imports Config settings
import config from "~/config"

//Import Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

//Init the state
export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: false,
    darkTheme: true,
};

//Creating Redux Slice For customization
export const customizationReducer = createSlice({
    name: "customizingTheme",
    initialState,
    reducers: {
        SET_OpenedItemInMenu: (state, action) => {
            let id;
            id = action.payload.id;
            state.isOpen = [id];
        },
        SET_MenuOpen: (state, action) => {
            state.opened = action.payload.opened
        },
        SET_FontFamily: (state, action) => {
            state.fontFamily = action.payload.fontFamily
        },
        SET_BorderRadius: (state, action) => {
            state.borderRadius = action.payload.borderRadius
        },
        SET_DarkTheme: (state, action) => {
            state.darkTheme = action.payload.darkTheme
        },
    }
});

export const {
    SET_OpenedItemInMenu,
    SET_MenuOpen,
    SET_FontFamily,
    SET_BorderRadius,
    SET_DarkTheme,
} = customizationReducer.actions;



export default customizationReducer.reducer;
