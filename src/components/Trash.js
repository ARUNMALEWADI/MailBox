import React, { useEffect, useState } from 'react'
import Panel from './Panel/Panel'
import classes from './Inbox.module.css'

const Trash = () => 
{ const [Trash,SetTrash]=useState([])
  const email=localStorage.getItem('email').replace('.','')
 const deleteHandler=async(id)=>{
  const res=await fetch(`https://mailbox-a63bd-default-rtdb.firebaseio.com/Trash/${email}/${id}.json`,{method:"DELETE",headers:{"Content-Type":"application/json"}})
  console.log(res.json());
  
 }




  useEffect(()=>{
    const GetTrashData=async()=>{
      const res=await fetch(`https://mailbox-a63bd-default-rtdb.firebaseio.com/Trash/${email}.json`)
      const response=await res.json();
      let temparr=[];
      for(let key in response)
      {  temparr.push({from:response[key].from,message:response[key].message,subject:response[key].subject,id:key})

      }
      SetTrash(temparr)
    }
    GetTrashData()
  },[Trash])
  
  return <>
    <Panel></Panel>
    <ul className={classes.ul}>
         {Trash.length>0&&Trash.map((item) => {
              return (
                <li className={classes.li}><div className={item.read?classes.read:classes.unread}><div>{item.from}</div><div className={classes.subject}>{item.subject.substr(0,15)+'.....'}</div><div> <button
                      type="button"
                      class={classes.delete}
                      onClick={deleteHandler.bind(null, item.id)}
                                >
                      delete
                    </button></div></div></li>
              )})
            }
            {Trash.length<=0&&<h1 style={{marginLeft:'1cm',position:"relative"}}>No Mails to display......</h1>

            }
         
       </ul>
  </>
}

export default Trash