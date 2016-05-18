import {createStore, Action} from 'redux';

function counter(state: number, action: Action): number {
    let newState: number;
    switch(action.type) {
        case 'INCREMENT':
            newState = state + 1;
            break;
        case 'DECREMENT':
            newState = state - 1;
            break;
        default:
            newState = state || 0;
            break;
    }
    
    return newState;
}

const store = createStore(counter);

console.log(store.getState());

store.dispatch({ type: 'INCREMENT' });

console.log(store.getState());