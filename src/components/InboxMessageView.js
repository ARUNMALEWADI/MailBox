import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import './ViewMessage.css'


const InboxMessageView = () => {
  const getRequest = useSelector((state) => state.inbox.getrequest);
  const {Identifier} =useParams();
  const arrayData = useSelector(state =>state.inbox.inboxData)
  console.log(arrayData);
  const Msg = arrayData.filter((msg)=>msg.id === Identifier)
  // const sigleMsg = Msg[0].message;
  //  console.log(sigleMsg);
  // const user = Msg[0].from


  let url = "https://mailbox-a63bd-default-rtdb.firebaseio.com/"

  const receiver1 = localStorage.getItem('email').replace(".", "");

  const putData = async ()=>{
    try {
        const response = await fetch(`${url}/Inbox/${receiver1}/${Identifier}.json`,{
          method:'PATCH',
          body:JSON.stringify({
            read:true
          }),
          headers:{
            'Content-Type':'application/json'
          }
        })

        console.log(response)
    } catch (error) {
      alert(error)
    }
  }
useEffect(()=>{
  putData()
},[])

console.log(getRequest)
  return (
    <div className='page'>
    <div className='page1'>
   
   {  getRequest && <div >
      <p>From :- {Msg[0].from}</p>
      <p>Subject:-{Msg[0].subject}</p>
      <label>Message:</label>
      <textarea>{Msg[0].message}</textarea>
      </div>}
      
    </div></div>
  )
}

export default InboxMessageView