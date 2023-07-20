import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    inboxData:[],
    unread:0,
    getReq:false
 
}

const InboxReducer=createSlice({
    name:'Inbox',
    initialState:initialState,
    reducers:{
        changeInbox(state,action){
            state.inboxData=action.payload
        },
        updateUnread(state,action)
        {
            state.unread=action.payload
        },
        updateGet(state){
            console.log("hi")
            state.getReq =!state.getReq
            console.log(state.getReq)
        }}
})

export const InboxActions = InboxReducer.actions

export default InboxReducer;