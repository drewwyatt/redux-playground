/// <reference path="../../typings/index.d.ts" />

import {createStore, Action} from 'redux';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as deepFreeze from 'deep-freeze';

const CounterActionType = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    ADD_COUNTER: 'ADD_COUNTER',
    REMOVE_COUNTER: 'REMOVE_COUNTER'
}

interface CounterAction extends Action {
    index: number;
}

function addCounter(list: number[]): number[] {
    list = list || [];
    return [...list, 0];
}

function removeCounter(list: number[], index: number): number[] {
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ];
}

function incrementCounter(list: number[], index: number): number[] {
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
    ];
}

function decrementCounter(list: number[], index: number): number[] {
    return [
        ...list.slice(0, index),
        list[index] - 1,
        ...list.slice(index + 1)
    ];
}

function counters(state: number[], action: CounterAction): number[] {
    switch(action.type) {
        case CounterActionType.INCREMENT:
            return incrementCounter(state, action.index);
        case CounterActionType.DECREMENT:
            return decrementCounter(state, action.index)
        case CounterActionType.ADD_COUNTER:
            return addCounter(state);
        case CounterActionType.REMOVE_COUNTER:
            return removeCounter(state, action.index);
        default:
            return state || [0];
    }
}

const store = createStore(counters);

interface CounterProps {
    value: number;
    onIncrement(): void;
    onDecrement(): void;
}

class Counter extends React.Component<CounterProps, any> {
    render(): React.ReactElement<Counter> {
        const {value, onIncrement, onDecrement} = this.props;
        return (
            <div>
                <h1>{value}</h1>
                <button onClick={onDecrement}>-</button>
                <button onClick={onIncrement}>+</button>
            </div>
        );
    }
}

interface CountersProps {
    values: number[];
    addCounter(): void;
    removeCounter(): void;
}

class Counters extends React.Component<CountersProps, any> {
    render(): React.ReactElement<Counters> {
        const {values, addCounter, removeCounter} = this.props;
        let counters: React.ReactElement<Counter>[] = [];
        values.forEach((value, index) => 
            counters.push(
                <Counter 
                    value={value} 
                    onIncrement={() => store.dispatch({type: CounterActionType.INCREMENT, index: index})} 
                    onDecrement={() => store.dispatch({type: CounterActionType.DECREMENT, index: index})} />
            )
        );
        
        return (
            <div>
                <div>{counters}</div>
                <button onClick={removeCounter}>Remove Counter</button><button onClick={addCounter}>Add Counter</button>
            </div>
        );
    }
}

function render() {
    ReactDom.render(
        <Counters
            values={store.getState()} 
            addCounter={() => store.dispatch({type: CounterActionType.ADD_COUNTER})} 
            removeCounter={() => store.dispatch({type: CounterActionType.REMOVE_COUNTER, index: (store.getState().length - 1) })} />,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();