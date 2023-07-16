import { createSlice } from "@reduxjs/toolkit";

const initialState ={ dataSentBox:[]}


const sentBox = createSlice({
    name:'sentBox',
    initialState:initialState,
    reducers:{
        updateSentBox(state,action)
        {
            state.dataSentBox=action.payload
        }
    }

})

export const sentBoxAction = sentBox.actions

export default sentBox;