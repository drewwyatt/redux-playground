import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, combineReducers, Action} from 'redux';

const TodoActionType = {
    ADD_TODO: 'ADD_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO',
    SET_VISIBILITY_FILTER: 'SET_VISIBILITY_FILTER'
};

interface TodoAction extends Action {
    id: number;
    text?: string;
    filter?: string;
};

interface Todo {
    id: number;
    text: string;
    completed: boolean;
};

interface AppState {
    todos?: Todo[];
    visibilityFilter?: string;
};

const todo = (state: Todo, action: TodoAction): Todo => {
    switch (action.type) {
        case TodoActionType.ADD_TODO:
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case TodoActionType.TOGGLE_TODO:
            if (state.id !== action.id) {
                return state;
            } else {
                return {
                    id: state.id,
                    text: state.text,
                    completed: !state.completed
                };
            }
        default:
            return state;
    }
}

const todos = (state: Todo[] = [], action: TodoAction): Todo[] => {
    switch (action.type) {
        case TodoActionType.ADD_TODO:
            return [...state, todo(undefined, action)];
        case TodoActionType.TOGGLE_TODO:
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};

const visibilityFilter = (state: string = '', action: TodoAction): any => {
    switch(action.type) {
        case TodoActionType.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

// const todoApp = (state: AppState = {}, action: TodoAction): AppState => {
//     return {
//         todos: todos(state.todos, action),
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//     };
// }

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

class TodoApp extends React.Component<{todos: Todo[]}, void> {
    private _input: HTMLInputElement;
    private _nextTodoID: number = 0;
    
    render() {
        return(
            <div>
                <input ref={node => {
                    this._input = node;
                }} />
                <button onClick={() => {
                    store.dispatch({
                        type: TodoActionType.ADD_TODO,
                        text: this._input.value,
                        id: this._nextTodoID++
                    })
                }}> 
                    Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo => 
                        <li key={todo.id}>{todo.text}</li>
                    )}
                </ul>
            </div>
        );
    }
}

const render = () => {
    const state: AppState = store.getState();
   ReactDOM.render(
       <TodoApp 
            todos={state.todos} 
        />,
        document.getElementById('todos'));
}

const store = createStore(todoApp);
store.subscribe(render);
render();