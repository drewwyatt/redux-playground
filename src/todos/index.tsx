import * as expect from 'expect';
import * as deepFreeze from 'deep-freeze';
import {Action} from 'redux';

const TodoActionType = {
    ADD_TODO: 'ADD_TODO',
    TOGGLE_TODO: 'TOGGLE_TODO'
};

interface TodoAction extends Action {
    id: number;
    text?: string;
}

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const todos = (state: Todo[] = [], action: TodoAction) => {
    switch(action.type) {
        case TodoActionType.ADD_TODO:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        case TodoActionType.TOGGLE_TODO:
            return state.map(todo => {
                if(todo.id !== action.id) {
                    return todo;
                } else {
                    return {
                      id: todo.id,
                      text: todo.text,
                      completed: !todo.completed  
                    };
                }
            })
        default:
            return [];
    }
};

const testAddTodo = () => {
    const stateBefore: Todo[] = [];
    const action: TodoAction = {
        type: TodoActionType.ADD_TODO,
        id: 0,
        text: 'Learn Redux'
    };
    
    const stateAfter = [{
        id: 0,
        text: 'Learn Redux',
        completed: false
    }];
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);    
};

const testToggleTodo = () => {
    const stateBefore: Todo[] = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: false
        }
    ];  
    
    const action: TodoAction = {
        id: 1,
        type: TodoActionType.TOGGLE_TODO
    }
    
    const stateAfter: Todo[] = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: true
        }
    ];  
    
    deepFreeze(stateBefore);
    deepFreeze(action);
    
    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo()
console.log('All tests passed');