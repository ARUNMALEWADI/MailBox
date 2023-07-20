import React, { useEffect } from 'react'
import classes from './Panel.module.css'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { InboxActions } from '../Store/InBoxslice'
import { Authactions } from '../Store/Auth-slice'


const Panel = () => {

    const dispatch = useDispatch();
    const unread = useSelector((state) => state.inbox.unread);

  
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
        dispatch(InboxActions.updateGet())
     
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
  
    // LogOutHandler :
    const LogoutHandler = () => {
      dispatch(Authactions.logoutHandler());
    };
  
    // getData func will call after every 2 sec : so new mail render on UI without refresh.
    useEffect(() => {
    //   const intervalId = setInterval(() => {
    // getData();

    //   }, 2000);
  
    //   return () => {
    //     clearInterval(intervalId);

          
    //   };
    getData()
    }, []);












return  <div className={classes.div}>
    <div className={classes.icon}>
      <img src={require("../../assets/mailicon.png")} alt='image not loading' className={classes.icon}></img>
      <section>Gmail</section>
</div>
    <Link to="/inbox">
<button>
   <section>
    <img src={require("../../assets/inboxicon.png")} alt=' not loading'></img></section> 
   <section>
   Inbox
  {unread>0&&<section  style={{display:"inline-flex",alignContent:"flex-start",color:"red",fontWeight:"bold"}}>{unread}</section>}
    </section>
     </button>  
     </Link> 

     <Link to="/sentbox">
        <button>
        <section><img src={require("../../assets/senticon.png")} alt='not loading'></img></section> 
        <section>Sent</section>
        </button></Link>
     <Link to="/sendmail"><button>
        <section>
        <img src={require("../../assets/composeicon.png")} alt='not loading'></img>
       </section>
       <section>Compose</section>
        </button></Link> 
<Link to="/trash"><button> 
       <section>
        <img src={require("../../assets/trashicon.png")} alt='image not loading'></img>
         </section>
         <section>Trash</section>
    </button> </Link>  
<Link to="/auth"><button onClick={LogoutHandler}>
      <section>
        <img src={require("../../assets/logouticon.png")} alt='image not loading'></img>
    </section>
    <section>
        Logout
    </section>
    </button></Link>
</div>


}

export default Panel