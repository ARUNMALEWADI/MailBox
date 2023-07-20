import { Fragment } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import Authentication from './components/auth/Authentication';
import Inbox from './components/Inbox';
import SendMail from './components/SendMail';
import Trash from './components/Trash';
import SentMail from './components/SentMail';
import InboxMessageView from './components/InboxMessageView';
import SentboxMessageView from './components/SentboxMessageView';
import { useDispatch, useSelector } from 'react-redux';
import { InboxActions } from './components/Store/InBoxslice';
import Panel from './components/Panel/Panel';
import FetchData from './components/FetchData';

function App() {  
  const getRequest = useSelector((state) => state.inbox.getReq);

  return <Fragment>
   {/* <Panel></Panel> */}
   <FetchData></FetchData>
  <Switch>
      <Route path="/auth"><Authentication></Authentication></Route>
      <Route path="/sentbox" exact><SentMail></SentMail></Route>
      <Route path="/inbox" exact><Inbox></Inbox></Route>
      <Route path="/sendmail"><SendMail></SendMail></Route>
      <Route path="/trash"><Trash></Trash></Route>
      <Route path="/inbox/:Identifier" exact ><InboxMessageView/></Route>
      <Route path="/sentbox/:Identifier"  ><SentboxMessageView/></Route>

      
    </Switch>

  </Fragment>
}

export default App;
