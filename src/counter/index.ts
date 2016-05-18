import {createStore, Action} from 'redux';

const CounterAction = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
}

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

function render(): void {
    document.body.innerText = store.getState().toString();
}

store.subscribe(render);
render();

document.addEventListener('click', () => {
    store.dispatch({ type: CounterAction.INCREMENT });
});
