import {createStore} from "redux";
import {rootReducer} from "./reducers/rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';


const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') || '')
  : {}

export const store = createStore(rootReducer, persistedState, composeWithDevTools())

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})