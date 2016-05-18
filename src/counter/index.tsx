/// <reference path="../../typings/main.d.ts" />

import {createStore, Action} from 'redux';
import * as React from 'react';
import * as ReactDom from 'react-dom';


const CounterAction = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
}

// function counter(state: number, action: any): number {
function counter(state:number, action: any): number {
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

interface CounterProps {
    value: number;
    onIncrement(): void;
    onDecrement(): void;
}

class Counter extends React.Component<CounterProps, number> {
    constructor(props: CounterProps, state: number) {
        super(props, state);
        console.log(props, state);
    }
    
    render() {
        const {value, onDecrement, onIncrement} = this.props;
        return (
            <div>
                <h1>{value}</h1>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        );
    }
}

function render() {
    ReactDom.render(
        <Counter 
            value={store.getState()} 
            onIncrement={() => {
                store.dispatch({type: CounterAction.INCREMENT})
            }}
            onDecrement={() => {
                store.dispatch({type: CounterAction.DECREMENT})
            }} />,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();