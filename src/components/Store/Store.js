import {configureStore} from '@reduxjs/toolkit'
import auth from './Auth-slice';
import InboxReducer from './InBoxslice';
import sentBox from './SentMail-Slice';

const Store=configureStore({reducer:{auth:auth.reducer,inbox:InboxReducer.reducer,sentbox:sentBox.reducer}})
export default Store;