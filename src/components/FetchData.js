
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InboxActions } from './Store/InBoxslice';
import { sentBoxAction } from './Store/SentMail-Slice';
import { Trashactions } from './Store/Trashboxslice';

const FetchData = () => {
   const dispatch = useDispatch();
    const unread = useSelector((state) => state.inbox.unread);
    const getRequest = useSelector((state) => state.inbox.getrequest);
 
  
    let url = "https://mailbox-a63bd-default-rtdb.firebaseio.com/";
    const email = localStorage.getItem("email").replace(".", "");
  
    const getData = async () => {
      try {
        const response = await fetch(`${url}/Inbox/${email}.json`);
        const data = await response.json();
        // console.log(data)
        let arrayOfData = [];
        for (let key in data) {
          arrayOfData.unshift({ id: key, ...data[key] });
        }
  
        dispatch(InboxActions.changeInbox(arrayOfData));
        if(getRequest==false)
      {  dispatch(InboxActions.updateGetRequest())
        console.log("Haad")
      }
        let count = 0;
        arrayOfData.forEach((msg) => {
          if (msg.read === false) {
            count++;
          }
        });
        dispatch(InboxActions.updateUnread(count));
       
    
      } catch (error) {
        console.log(error);
      }
    };
  
  
  
  
  
    useEffect(() => {
        getData();
    }, []);

  //Sentboxdata
  const sentboxData = async () => {
    try {
      const response = await fetch(`${url}/sentBox/${email}.json`);

      const data = await response.json();

      console.log(data);
      const arrayData = [];

      for (let key in data) {
        arrayData.unshift({ id: key, ...data[key] });
      }
      dispatch(sentBoxAction.updateSentBox(arrayData));
      dispatch(sentBoxAction.updateGet())
    } catch (error) {
      alert(error);
    }
  };

  //  calling getData()
  useEffect(() => {
    sentboxData();
  }, []);




  //trashdata
  useEffect(()=>{
    const GetTrashData=async()=>{
      const res=await fetch(`https://mailbox-a63bd-default-rtdb.firebaseio.com/Trash/${email}.json`)
      const response=await res.json();
      let temparr=[];
      if(response)
      {
      for(let key in response)
      {  temparr.push({from:response[key].from,message:response[key].message,subject:response[key].subject,id:key})

      }
      dispatch(Trashactions.updateTrashBox(temparr))
      dispatch(Trashactions.updateGet())
    }
    }
    GetTrashData()
  },[])


  return (
<div></div>
  )
}

export default FetchData