import { createSlice } from "@reduxjs/toolkit";
const Trashslice=createSlice({
name:'trashslice',
initialState:{  TrashboxData:[], getreq:false
},
reducers:{
    updateTrashBox(state,action)
    {
        state.TrashboxData=action.payload
    },
    updateGet(state)
    {
       state.getreq=!state.getreq;
    }
}


})
export default Trashslice;
export const Trashactions=Trashslice.actions;