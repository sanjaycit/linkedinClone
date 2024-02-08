import { createStore, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk'; // Import the thunk middleware correctly
import rootReducer from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
