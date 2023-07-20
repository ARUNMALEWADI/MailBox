import {createSlice} from '@reduxjs/toolkit'
const auth=createSlice({
    name:"Authentication",
    initialState:{
        Isloggedin:false,
        email:localStorage.getItem('email'),
        token:localStorage.getItem('token')
    },
 reducers:{
    loginHandler(state,action)
    {  state.email=action.payload.email
       state.token=action.payload.token
       state.Isloggedin=true

    },
    logoutHandler(state)
    {
        state.email=''
       state.token=''
       state.Isloggedin=false;
       localStorage.removeItem("email")
       localStorage.removeItem('token')
    }
}
})
export default auth;
export const Authactions=auth.actions;