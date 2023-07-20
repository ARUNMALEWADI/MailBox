import React, { useEffect, useState } from 'react'
import Panel from './Panel/Panel'
import classes from './Inbox.module.css'
import { Link } from 'react-router-dom'
import { Trashactions } from './Store/Trashboxslice'
import { useDispatch } from 'react-redux'

const Trash = () => 
{ const [Trash,SetTrash]=useState([])
  const dispatch=useDispatch()
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
      dispatch(Trashactions.updateTrashBox(temparr))
     
      SetTrash(temparr)
    }
    GetTrashData()
  },[Trash])
  
  return <>
    <Panel></Panel>
    <div className={classes.page}>
    <label style={{position:"relative",fontSize:"x-large",fontWeight:"bold",marginLeft:"30%"}}>TRASH:</label>
    <ul className={classes.ul}>
         {/* {Trash.length>0&&Trash.map((item) => {
              return (
                <li className={classes.li}><div className={item.read?classes.read:classes.unread}><div>{item.from}</div><div className={classes.subject}>{item.subject.substr(0,15)+'.....'}</div><div> <button
                      type="button"
                      class={classes.delete}
                      onClick={deleteHandler.bind(null, item.id)}
                                >
                      delete
                    </button></div></div></li>
              )})
            } */}
        
            {Trash.length>0&&Trash.map((item)=> {
              return (
              <div className={classes.div1}><Link to={`/trash/${item.id}`} > <li className={classes.li}><div className={item.read?classes.read:classes.unread}><div>{item.from}</div><div className={classes.subject}>{item.subject.substr(0,15)+'.....'}</div></div></li></Link><button
                      type="button"
                      class={classes.delete}
                      onClick={deleteHandler.bind(null, item.id)}
                                >
                      delete
                    </button></div>
              )})
            }
         
 



            {Trash.length<=0&&<h1 style={{marginLeft:'1cm',position:"relative"}}>No Mails to display......</h1>

            }
         
       </ul>
       </div>
  </>
}

export default Trash