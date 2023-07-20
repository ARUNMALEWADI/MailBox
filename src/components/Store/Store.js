import {configureStore} from '@reduxjs/toolkit'
import auth from './Auth-slice';
import InboxReducer from './InBoxslice';
import sentBox from './SentMail-Slice';
import Trashslice from './Trashboxslice';

const Store=configureStore({reducer:{auth:auth.reducer,inbox:InboxReducer.reducer,
    sentbox:sentBox.reducer,trashbox:Trashslice.reducer}})
export default Store;