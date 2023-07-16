import React,{Fragment, useState} from 'react'
 import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';
import Panel from './Panel/Panel';


const SendMail = () => {
    const [editorState,setEditorState] = useState(()=> EditorState.createEmpty())
    const[receiver,setReceiver]=useState('')
    const [subject,setSubject]=useState('')
    const email=useSelector(state=>state.auth.email)
    
    let url="https://mailbox-a63bd-default-rtdb.firebaseio.com/"

    const postDataToSentBox = async()=>{
      const sender=(email).replace('.','')
        try {
            const response = await fetch(`${url}/sentBox/${sender}.json`,{
                method:'POST',
                body:JSON.stringify({
                    to:receiver,
                    subject:subject,
                    message:editorState.getCurrentContent().getPlainText()
                }),
                headers:{
                    'Content-Type':'application/json'
                }
              
            })
            toast.success('Mail Sent Successfully')
        } catch (error) {
            alert(error)
        }
    }

 const postDataToInbox =async()=>{
    const receiver1 =receiver.replace('.','')
    try {
        const response = await fetch(`${url}/Inbox/${receiver1}.json`,{
            method:'POST',
            body:JSON.stringify({
                from:email,
                subject:subject,
                message:editorState.getCurrentContent().getPlainText(),
                read:false

            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
    } catch (error) {
        alert(error)
        
    }
 }



 const EditorStateChangeHandler=(e)=>{
    setEditorState(e)
 }

 const receiverHandler =(e)=>{
    setReceiver(e.target.value)
 }

 const subjectHandler =(e)=>{
    setSubject(e.target.value)
 }


 const submitHandler =(e)=>{
    e.preventDefault()
     postDataToInbox()
    postDataToSentBox()
    setReceiver('')
    setSubject('')
    setEditorState('')
 }

  return <>
  <Panel></Panel>
  <div className='container'>
    <div className='ComposeParentMailBox'>
      <div className='ChildBox1'>
        <div>
          To:-
        </div>
        <div className='sideDiv'>
          <input type='email' placeholder='Enter Email Id' onChange={receiverHandler} value={receiver} />
          <button className='btn btn-primary' onClick={submitHandler}>Send</button>
        </div>

      </div>
      <div className='childBox2'>
        <div>Subject :- </div>
        <input type='text' value={subject} onChange={subjectHandler} />
      </div>
      <div className='childBox3'>
        <Editor
          editorState={editorState}
          onEditorStateChange={EditorStateChangeHandler} />
      </div>
    </div>
    <ToastContainer />
  </div></>
  
}

export default SendMail;