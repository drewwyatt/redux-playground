import {CounterAction, CounterActionType, incrementCounter, decrementCounter, addCounter, removeCounter} from './actions';

export function countersReducer(state: number[], action: CounterAction): number[] {
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