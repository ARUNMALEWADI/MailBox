import React, { Fragment } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Inbox = () => {
  return<Fragment>
    <div>
    <Link to="/"><button>Inbox</button></Link>   
   <Link to="/sentbox"><button>Sent</button></Link>   
    <Link to="/sendmail"><button>Send Email</button> </Link>   
     <Link to="/trash"><button>Trash</button></Link>   
    <Link to="/auth"><button>Logout</button></Link>
    </div>
  </Fragment>
}

export default Inbox