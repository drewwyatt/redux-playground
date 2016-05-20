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

const visibilityFilter = (state: string = 'SHOW_ALL', action: TodoAction): any => {
    switch (action.type) {
        case TodoActionType.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const Todo = ({ onClick, completed, text }): JSX.Element => {
    return (
        <li
            onClick={onClick}
            style={{
                textDecoration:
                completed ? 'line-through' : 'none'
            }}>{text}</li>
    );
}

interface TodoListProps {
    todos: Todo[];
    onTodoClick(todoID: number): void;
}
const TodoList = ({ todos, onTodoClick}: TodoListProps): JSX.Element => {
    return (
        <ul>
            {todos.map(todo =>
                <Todo
                    key={todo.id}
                    completed={todo.completed}
                    text={todo.text}
                    onClick={() => onTodoClick(todo.id) } />
            ) }
        </ul>
    );
};

const FilterLink = ({ filter, currentFilter, children }): any => {
    if (filter === currentFilter) {
        return <span>{children}</span>
    } else {
        return (
            <a href="#"
                onClick={e => {
                    e.preventDefault();
                    store.dispatch({
                        type: TodoActionType.SET_VISIBILITY_FILTER,
                        filter
                    });
                } }
                >{children}</a>
        );
    }
}

interface AddTodoProps {
    onAddClick(text: string): void; 
}
const AddTodo = ({onAddClick}: AddTodoProps): JSX.Element => {
    let input: HTMLInputElement;
    return (
        <div>
            <input ref={ node => input = node } />
            <button onClick={() => {
                onAddClick(input.value);
                input.value='';
            }}>
                Add Todo
            </button>
        </div>
    );
}

const getVisibleTodos = (todos: Todo[], filter: string): Todo[] => {
    switch (filter) {
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        default:
            return todos;
    }
}

class TodoApp extends React.Component<{ todos: Todo[], visibilityFilter: string }, void> {
    private _nextTodoID: number = 0;

    render() {
        const { todos, visibilityFilter } = this.props;
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);
        return (
            <div>
                <AddTodo
                    onAddClick={text => store.dispatch({ type: TodoActionType.ADD_TODO, id: this._nextTodoID++, text: text })} />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={(id: number) => store.dispatch({ type: TodoActionType.TOGGLE_TODO, id: id }) } />
                <p>
                    Show:
                    {' '}
                    <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>All</FilterLink>
                    {' '}
                    <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>Active</FilterLink>
                    {' '}
                    <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>Completed</FilterLink>
                </p>
            </div>
        );
    }
}

const render = () => {
    const state: AppState = store.getState();
    ReactDOM.render(
        <TodoApp
            todos={state.todos}
            visibilityFilter={state.visibilityFilter}
            />,
        document.getElementById('todos'));
}

const store = createStore(todoApp);
store.subscribe(render);
render();