/// <reference path="../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Counters} from './counters.component';
import {CounterActionType} from './actions';
import {countersStore} from './stores';

function render() {
    ReactDom.render(
        <Counters
            values={countersStore.getState()} 
            addCounter={() => countersStore.dispatch({type: CounterActionType.ADD_COUNTER})} 
            removeCounter={() => countersStore.dispatch({type: CounterActionType.REMOVE_COUNTER, index: (countersStore.getState().length - 1) })} />,
        document.getElementById('counters')
    );
}

countersStore.subscribe(render);
render();