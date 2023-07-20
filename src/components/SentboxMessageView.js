import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import "./ViewMessage.css"

const SentboxMessageView = () => {
  const { Identifier } = useParams();
  const dataSentBox = useSelector((state) => state.sentbox.dataSentBox);
  const Maildetails = dataSentBox.filter((msg) => msg.id === Identifier);

  const Message = Maildetails[0].message;
const subject=Maildetails[0].subject;
  const user = Maildetails[0].to;

  return (
    <div className='page' >
      {/* <Link to="/sentBox">
        <Button>Back to sent</Button>
      </Link> */}
      <div className='page1' >
        <p>To : - {user}</p>
        <p>Subject:-{subject}</p>
        <label>Message :- </label>
        <textarea>{Message}</textarea>
      </div>
    </div>
  );
}

export default SentboxMessageView