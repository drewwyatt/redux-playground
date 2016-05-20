import * as deepFreeze from 'deep-freeze';
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

const store = createStore(todoApp);
store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: TodoActionType.ADD_TODO, id: 0, text: "foo" });
store.dispatch({ type: TodoActionType.ADD_TODO, id: 1, text: "bar" });
store.dispatch({ type: TodoActionType.ADD_TODO, id: 1, text: "baz" });

store.dispatch({type: TodoActionType.TOGGLE_TODO, id: 1});

store.dispatch({type: TodoActionType.SET_VISIBILITY_FILTER, filter: "boom boom pow" });