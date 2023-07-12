import {configureStore} from '@reduxjs/toolkit'
import auth from './Auth-slice';

const Store=configureStore({reducer:{auth:auth.reducer}})
export default Store;