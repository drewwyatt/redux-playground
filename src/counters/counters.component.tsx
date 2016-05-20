import * as React from 'react';
import {Counter} from './counter.component';
import {CounterActionType} from './actions';
import {countersStore} from './stores';

export interface CountersProps {
    values: number[];
    addCounter(): void;
    removeCounter(): void;
}

export class Counters extends React.Component<CountersProps, any> {
    render(): React.ReactElement<Counters> {
        const {values, addCounter, removeCounter} = this.props;
        const counters: React.ReactElement<Counter>[] = [];
        values.forEach((value, index) => 
            counters.push(
                <Counter 
                    key={index}
                    value={value} 
                    onIncrement={() => countersStore.dispatch({type: CounterActionType.INCREMENT, index: index})} 
                    onDecrement={() => countersStore.dispatch({type: CounterActionType.DECREMENT, index: index})} />
            )
        );
        
        return (
            <div>
                <div>{counters}</div>
                <hr />
                <button onClick={removeCounter}>Remove Counter</button>
                <button onClick={addCounter}>Add Counter</button>
            </div>
        );
    }
}