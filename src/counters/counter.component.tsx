import * as React from 'react';

export interface CounterProps {
    value: number;
    onIncrement(): void;
    onDecrement(): void;
}

export class Counter extends React.Component<CounterProps, any> {
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