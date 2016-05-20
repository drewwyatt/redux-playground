import {createStore, Store}  from 'redux';
import {countersReducer} from './reducers';

export const countersStore = createStore(countersReducer);