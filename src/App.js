import { Fragment } from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import Authentication from './components/auth/Authentication';
import Inbox from './components/Inbox';
import SendMail from './components/SendMail';
import Trash from './components/Trash';
import SentMail from './components/SentMail';

function App() {  
  return <Fragment>
    <Switch>
      <Route path="/auth"><Authentication></Authentication></Route>
      <Route path="/sentbox"><SentMail></SentMail></Route>
      <Route path="/sendmail"><SendMail></SendMail></Route>
      <Route path="/trash"><Trash></Trash></Route>
      <Route path="/"><Inbox></Inbox></Route>
      
    </Switch>

  </Fragment>
}

export default App;
