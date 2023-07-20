import React, { useRef, useState } from 'react'
import { Fragment } from 'react'
import { Authactions } from '../Store/Auth-slice'
import { useDispatch } from 'react-redux'
import classes from'./Authentication.module.css'

const Authentication = () => {
   const [login,setlogin]=useState(true)
   const emailref=useRef()
   const passwordref=useRef()
   const dispatch=useDispatch()
     const SubmitHandler=async(e)=>{
        e.preventDefault();
        const authdata={
            email:emailref.current.value,
            password:passwordref.current.value,
            returnSecureToken:true
        }
        if(login)
            {  try{
                const res=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1439_3jsxP2uXWTZHi8LA8DnuWLXUVOg`,{method:"POST",body:JSON.stringify(authdata),headers:{"Content-Type":"application/json"}})
                const response=await res.json()
               
               if(response&&response.error)
               { 
                 throw new Error(response.error.message)
 
               }
               alert("Authentication successfull!")
               localStorage.setItem('email',response.email)
               localStorage.setItem('token',response.idToken)
               dispatch(Authactions.loginHandler({"email":response.email.replace('.',''),"token":response.idToken}))
            }
            catch(error){ 

             alert(error)
            }

            }
        else{  
            try{
            const res=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1439_3jsxP2uXWTZHi8LA8DnuWLXUVOg`,{method:"POST",body:JSON.stringify(authdata),headers:{"Content-Type":"application/json"}})
            const response=await res.json()
        
           if(response.ok)
           { 
              throw new Error(response.error.message)

           }
           alert("Authentication successfull!")
     
           localStorage.setItem('email',response.email)
           localStorage.setItem('token',response.idToken)
           dispatch(Authactions.loginHandler({email:localStorage.getItem('email'),token:localStorage.getItem('token')}))
        
        }
        catch(error){ 
            alert(error)

        }

        }

    }
    const ToggleHandler=()=>{
        setlogin(!login)
    }
  return <Fragment>
         <div className={classes.div1}>
            <div>
            <form onSubmit={SubmitHandler}  >
             <h1 >{login?"Login":"SignUp"}</h1>
             <label>Email:</label>
             <input type='email' required  class="border-2 border-red-900 ..." ref={emailref}></input>
             <label>Password:</label>
             <input type='password' required  class="border-2 border-red-900 ..." ref={passwordref}></input>
             <button class="bg-[#e11d48] h-10 w-20 text-[#f0f9ff]" type='submit' >{login?"Login":"SignUp"}</button>
             <p onClick={ToggleHandler}>{login?"New to mailbox? Signup":"Already have an account?Login"}</p>
            </form>
          </div>
         </div>
  </Fragment>
}

export default Authentication