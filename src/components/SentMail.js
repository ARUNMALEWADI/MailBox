import React from "react";
import classes from "./Inbox.module.css";
import "./Inbox.module.css"

import { sentBoxAction } from "./Store/SentMail-Slice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Panel from "./Panel/Panel";

const SentMail = () => {
  const dispatch = useDispatch();
  const sentBoxData = useSelector((state) => state.sentbox.dataSentBox);

  let url = "https://mailbox-a63bd-default-rtdb.firebaseio.com/";

  const email = localStorage.getItem("email").replace('.', "");

  const getData = async () => {
    try {
      const response = await fetch(`${url}/sentBox/${email}.json`);

      const data = await response.json();

      console.log(data);
      const arrayData = [];

      for (let key in data) {
        arrayData.unshift({ id: key, ...data[key] });
      }
      dispatch(sentBoxAction.updateSentBox(arrayData));
    } catch (error) {
      alert(error);
    }
  };

  //  Deleteing Mails from Database :-

  const deleteMail = async (id) => {
    try {
      const response = await fetch(`${url}/sentBox/${email}/${id}.json`, {
        method: "DELETE",
      });
      //   we call here getData() caz the remaining email we want to show to user , when delete specific email
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  //  Deleting Specific email via id :
  const deleteHandler = (id) => {
    deleteMail(id);
  };

  //  calling getData()
  useEffect(() => {
    getData();
  }, []);

  return <>
       <Panel></Panel>
       <div className={classes.page}>
       <label style={{position:"relative",fontSize:"x-large",fontWeight:"bold",marginLeft:"30%"}}>SENTBOX:</label>
       <ul className={classes.ul}>
         { sentBoxData.map((item, index) => {
              return (
              <div className={classes.div1}> <Link to={`/sentbox/${item.id}`}><li className={classes.li}> <div className={item.read?classes.read:classes.unread}><div>{item.to}</div><div className={classes.subject}>{item.subject.substr(0,15)+'.....'}</div></div></li></Link><button
              type="button"
              class={classes.delete}
              onClick={deleteHandler.bind(null, item.id)}
                        >
              delete
            </button >
            </div> 
            
              )})
            }
       
       </ul>
      </div>




   
  </>
};

export default SentMail;