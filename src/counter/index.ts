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

function notify(): void {
    console.log(store.getState());
}

function increment(): void {
    store.dispatch({ type: CounterAction.INCREMENT });
}

function decrement(): void {
    store.dispatch({ type: CounterAction.DECREMENT });
}

const store = createStore(counter);
store.subscribe(notify);

increment();
increment();
increment();
decrement();
decrement();
decrement();
decrement();
decrement();
increment();



// function render(): void {
//     document.body.innerText = store.getState().toString();
// }

// store.subscribe(render);
// render();

// document.addEventListener('click', () => {
//     store.dispatch({ type: CounterAction });
// });
