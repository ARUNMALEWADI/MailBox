import { createSlice } from "@reduxjs/toolkit";

const initialState ={ dataSentBox:[] ,getreq:false}


const sentBox = createSlice({
    name:'sentBox',
    initialState:initialState,
    reducers:{
        updateSentBox(state,action)
        {
            state.dataSentBox=action.payload
        },
        updateGet(state)
        {
           state.getreq=!state.getreq;
        }
    }

})

export const sentBoxAction = sentBox.actions

export default sentBox;