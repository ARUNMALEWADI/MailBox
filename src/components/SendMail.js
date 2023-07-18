import React,{ useState} from 'react'
 import { ToastContainer, toast } from "react-toastify";
import classes from './SendMail.module.css'
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
     <form className={classes.mailform} onSubmit={submitHandler}>
     <input type='email' placeholder='Recipients' onChange={receiverHandler} value={receiver} className={classes.receiver} required />
     <input type='text' value={subject} onChange={subjectHandler} className={classes.subject} /> 
     <div className={classes.editer}>
        <Editor 
          editorState={editorState}
          onEditorStateChange={EditorStateChangeHandler} />
      </div>
  
      <button  type='submit'  className={classes.send}>Send</button>
    </form>
   
    
   
    <ToastContainer />
 
  </>
  
}

export default SendMail;