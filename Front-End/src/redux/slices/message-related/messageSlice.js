//Import Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

//Init the state
export const initialState = {
    messages: [
        // {
        //     id: 1,
        //     messageBody: 'Enter your question in the chat box!',
        //     sender: 'User',
        //     contentType: 'text',
        //     hiddenFromUser:false,
        // },
        // {
        //     id: 2,
        //     messageBody: 'dummy message',
        //     sender: 'User',
        //     contentType: 'text',
        //     hiddenFromUser:false,
        // }, {
        //     id: 3,
        //     messageBody: 'dummy message',
        //     sender: 'User',
        //     contentType: 'text',
        //     hiddenFromUser:false,
        // }, {
        //     id: 4,
        //     messageBody: 'dummy message',
        //     sender: 'User',
        //     contentType: 'text',
        //     hiddenFromUser:false,
        // }, {
        //     id: 5,
        //     messageBody: 'dummy message',
        //     sender: 'User',
        //     contentType: 'text',
        //     hiddenFromUser:false,
        // }, {
        //     id: 6,
        //     messageBody: 'dummy message',
        //     sender: 'User',
        //     contentType: 'text',
        //     hiddenFromUser:false,
        // }, {
        //     id: 7,
        //     messageBody: 'dummy message',
        //     sender: 'User',
        //     contentType: 'text',
        //     hiddenFromUser:false,
        // },
    ],

    messageRecords: [
        // {
        //     id: 1,
        //     messageBody: 'Record1',
        //     sender: 'User',
        //     contentType: 'text',
        // },
        // {
        //     id: 2,
        //     messageBody: 'Record',
        //     sender: 'User',
        //     contentType: 'text',
        // }, {
        //     id: 3,
        //     messageBody: 'Record',
        //     sender: 'User',
        //     contentType: 'text',
        // }, {
        //     id: 4,
        //     messageBody: 'Record',
        //     sender: 'User',
        //     contentType: 'text',
        // }, {
        //     id: 5,
        //     messageBody: 'Record',
        //     sender: 'User',
        //     contentType: 'text',
        // }, {
        //     id: 6,
        //     messageBody: 'Record',
        //     sender: 'User',
        //     contentType: 'text',
        // }, {
        //     id: 7,
        //     messageBody: 'Record',
        //     sender: 'User',
        //     contentType: 'text',
        // },
    ],

    lastMessageId: 0, // default 0

    lastChunkOfMessageRecord: 0,

    currentAiEngine: "QuicAI",

    filterAiEngineForRecord: null,

    // For translation state
    translationMenuOpen: false,
    translationLanguage: 'en'

};

//Creating Redux Slice For customization
export const messagesFromUserAndServerReducer = createSlice({
    name: "messageFromUserAndServer",
    initialState,
    reducers: {
        SET_AddMessage: (state, action) => {
            state.messages = state.messages.concat([action.payload]);
            state.lastMessageId = state.lastMessageId + 1;
        },
        SET_CleanMessages: (state, action) => {
            state.messages = []
            state.lastMessageId = 0
        },
        SET_CurrentAiEngine: (state, action) => {
            state.currentAiEngine = action.payload.currentAiEngine;
        },
        SET_AddMessageRecords: (state, action) => {

            state.messageRecords = action.payload;

            state.lastChunkOfMessageRecord = state.lastChunkOfMessageRecord + 1;
        },
        SET_FilterAiEngineForRecord: (state, action) => {
            state.filterAiEngineForRecord = action.payload.filterAiEngineForRecord;
        },
        SET_TranslationLanguage: (state, action) => {
            state.translationLanguage = action.payload.translationLanguage;
        },
        SET_TranslationMenuOpen: (state, action) => {
            state.translationMenuOpen = action.payload.translationMenuOpen;
        },
    }
});

export const {
    SET_AddMessage,
    SET_CleanMessages,
    SET_CurrentAiEngine,
    SET_AddMessageRecords,
    SET_FilterAiEngineForRecord,
    SET_TranslationLanguage,
    SET_TranslationMenuOpen,
} = messagesFromUserAndServerReducer.actions;


export default messagesFromUserAndServerReducer.reducer;