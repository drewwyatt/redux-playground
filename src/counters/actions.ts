import {Action} from 'redux';

export const CounterActionType = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    ADD_COUNTER: 'ADD_COUNTER',
    REMOVE_COUNTER: 'REMOVE_COUNTER'
}

export interface CounterAction extends Action {
    index?: number;
}

export function addCounter(list: number[]): number[] {
    list = list || [];
    return [...list, 0];
}

export function removeCounter(list: number[], index: number): number[] {
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ];
}

export function incrementCounter(list: number[], index: number): number[] {
    return [
        ...list.slice(0, index),
        list[index] + 1,
        ...list.slice(index + 1)
    ];
}

export function decrementCounter(list: number[], index: number): number[] {
    return [
        ...list.slice(0, index),
        list[index] - 1,
        ...list.slice(index + 1)
    ];
}