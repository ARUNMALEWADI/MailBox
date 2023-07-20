import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ViewMessage.css"

const TrashboxMessageView = () => {
    const { Identifier } = useParams();
    const dataSentBox = useSelector((state) => state.trashbox.TrashboxData);
   const getreq=useSelector((state)=>state.trashbox.getreq)
    const Maildetails = dataSentBox.filter((msg) => msg.id === Identifier);
  
  
  
    return (
      <div className='page' >
     { getreq && <div className='page1' >
          <p>From: - {Maildetails[0].from}</p>
          <p>Subject:-{Maildetails[0].subject}</p>
          <label>Message :- </label>
          <textarea>{Maildetails[0].message}</textarea>
        </div>}
      </div>
    );
}

export default TrashboxMessageView