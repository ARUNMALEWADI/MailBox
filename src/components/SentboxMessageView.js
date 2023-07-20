import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ViewMessage.css"

const SentboxMessageView = () => {
  const { Identifier } = useParams();
  const dataSentBox = useSelector((state) => state.sentbox.dataSentBox);
 const getreq=useSelector((state)=>state.sentbox.getreq)
  const Maildetails = dataSentBox.filter((msg) => msg.id === Identifier);



  return (
    <div className='page' >
   {  getreq&& <div className='page1' >
        <p>To : - {Maildetails[0].to}</p>
        <p>Subject:-{Maildetails[0].subject}</p>
        <label>Message :- </label>
        <textarea>{Maildetails[0].message}</textarea>
      </div>}
    </div>
  );
}

export default SentboxMessageView