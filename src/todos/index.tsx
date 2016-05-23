import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore, combineReducers, Action, Store} from 'redux';

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

interface TodoAppState {
	todos: Todo[];
	visibilityFilter: 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';
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

class VisibileTodoList extends React.Component<TodoAppProps, void> {
	private _unsubscribe: () => void;
	
	componentDidMount(): void {
		const { store } = this.props;
		this._unsubscribe = store.subscribe(() => this.forceUpdate());
	}
	
	componentWillUnmount(): void {
		this._unsubscribe();
	}
	
	render() {
		const { store } = this.props;
		const state = store.getState() as TodoAppState;
		
		return (
			<TodoList 
				todos={getVisibleTodos(state.todos, state.visibilityFilter)}
				onTodoClick={id => store.dispatch({type: TodoActionType.TOGGLE_TODO, id})} />
		);
	}
}

interface LinkProps {
	active: any;
	children: any;
	onClick(): void;
}
const Link = ({ active, children, onClick }): any => {
	if (active) {
		return <span>{children}</span>
	} else {
		return (
			<a href="#"
				onClick={e => {
					e.preventDefault();
					onClick();
				} }
				>{children}</a>
		);
	}
}

interface FilterLinkProps {
	filter: string;
	store: Store<TodoAppState>;
};
class FilterLink extends React.Component<FilterLinkProps, void> {
	private _unsubscribe: () => void;
	
	componentDidMount(): void {
		const { store } = this.props;
		this._unsubscribe = store.subscribe(() => this.forceUpdate());
	}
	
	componentWillUnmount(): void {
		this._unsubscribe();
	}
	
	render(): JSX.Element {
		const { children, filter, store } = this.props;
		const state: TodoAppState = store.getState() as TodoAppState;
		
		return (
			<Link active={filter === state.visibilityFilter} onClick={() => store.dispatch({type: TodoActionType.SET_VISIBILITY_FILTER, filter })}>
				{children}
			</Link>
		);
	}
}

let nextTodoID = 0;
const AddTodo = ({store}: TodoAppProps): JSX.Element => {
	let input: HTMLInputElement;
	return (
		<div>
			<input ref={ node => input = node } />
			<button onClick={() => {
				store.dispatch({type: TodoActionType.ADD_TODO, id: nextTodoID++, text: input.value});
				input.value = '';
			} }>
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
const Footer = ({store}: TodoAppProps): JSX.Element => {
	return (
		<p>
			Show:
			{' '}
			<FilterLink filter='SHOW_ALL' store={store}>All</FilterLink>
			{' '}
			<FilterLink filter='SHOW_ACTIVE' store={store}>Active</FilterLink>
			{' '}
			<FilterLink filter='SHOW_COMPLETED' store={store}>Completed</FilterLink>
		</p>
	);
}

interface TodoAppProps {
	store: Store<TodoAppState>;
}
const TodoApp = ({store}: TodoAppProps): JSX.Element => {
	return (
		<div>
			<AddTodo store={store} />
			<VisibileTodoList store={store} />
			<Footer store={store} />
		</div>
	);
}

const render = () => {
	ReactDOM.render(
		<TodoApp store={createStore(todoApp) as Store<TodoAppState>} />,
		document.getElementById('todos'));
}

render();