import classes from "./Inbox.module.css"
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { InboxActions } from "./Store/InBoxslice";
import { useDispatch, useSelector } from "react-redux";
import Panel from "./Panel/Panel";




const Inbox = () => {


  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  
  console.log(search);
  const InboxData = useSelector((state) => state.inbox.inboxData);
  const updateCounterOnDelete = useSelector(
    (state) => state.inbox.unread
  );

  // Delete Email :-
  let url = "https://mailbox-a63bd-default-rtdb.firebaseio.com//";

  const email = localStorage.getItem("email").replace(".", "");

  const deleteData = async (id) => {
    try {
      const response = await fetch(`${url}/Inbox/${email}/${id}.json`, {
        method: "DELETE",
      });
      console.log(response);
      dispatch(
        InboxActions.changeInbox(InboxData.filter((item) => item.id != id))
      );
      dispatch(InboxActions.updateUnread());
    } catch (error) {
      console.log(error);
    }
  };


  // Passing id -  to delete specific email :- To deleteData :-
  const deleteHandler = (item) => {
    deleteData(item.id);
    UploadtoTrash(item);
 
  };

  // To delete when user click on delete , without refresh email get deleted ...fr that we use useEffect()
  useEffect(() => {
    dispatch(InboxActions.updateGet());
  }, [dispatch]);

  // Filter InboxData based on search input:
  const filteredInboxData = InboxData.filter((item) => {
    if (!search) {
      return true;
    } else {
      return item.from.toLowerCase().includes(search.toLowerCase());
    }
  });

async function UploadtoTrash(item){
console.log("Hi");
try{
  const res=await fetch(`https://mailbox-a63bd-default-rtdb.firebaseio.com/Trash/${email}.json`,{method:"POST",body:JSON.stringify(item),headers:{"Content-Type":"application/json"}})
  const response=res.json()
 
  
}
catch(error)
{ alert(error);
}
}











  return<Fragment>
     <Panel></Panel>
     
    <div className={classes.page}>
        <input
          type="search"
          style={{ marginBottom: "2rem", border: "1px solid" }}
          placeholder="Search By Name"
          onChange={(e) => setSearch(e.target.value)}
        />
       <ul className={classes.ul}>
         {filteredInboxData.map((item, index) => {
              return (
                <li className={classes.li}><div className={item.read?classes.read:classes.unread}><div>{item.from}</div><div className={classes.subject}>{item.subject.substr(0,15)+'.....'}</div><div> <button
                      type="button"
                      class={classes.delete}
                      onClick={deleteHandler.bind(null, item)}
                                >
                      delete
                    </button></div></div></li>
              )})
            }
         
       </ul>
      </div>
  </Fragment>



}

export default Inbox