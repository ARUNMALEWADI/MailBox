import React from 'react'
import classes from './Panel.module.css'
import { Link } from 'react-router-dom'


const Panel = () => {

return  <div className={classes.div}>
    <div className={classes.icon}>
      <img src={require("../../assets/mailicon.png")} alt='image not loading' className={classes.icon}></img>
      <section>Gmail</section>
</div>
    <Link to="/inbox">
<button>
   <section>
    <img src={require("../../assets/inboxicon.png")} alt='image not loading'></img></section> 
   <section>
   Inbox
    </section>
     </button>  
     </Link> 

     <Link to="/sentbox">
        <button>
        <section><img src={require("../../assets/senticon.png")} alt='image not loading'></img></section> 
        <section>Sent</section>
        </button></Link>
     <Link to="/sendmail"><button>
        <section>
        <img src={require("../../assets/composeicon.png")} alt='image not loading'></img>
       </section>
       <section>Compose</section>
        </button></Link> 
<Link to="/trash"><button> 
       <section>
        <img src={require("../../assets/trashicon.png")} alt='image not loading'></img>
         </section>
         <section>Trash</section>
    </button> </Link>  
<Link to="/auth"><button>
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