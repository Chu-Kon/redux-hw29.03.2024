import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, updateTodo } from '../../store/slices/todosSlice'; 
import './TodoList.css';


const TodoList = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos.items);
    const status = useSelector((state) => state.todos.status);
    const error = useSelector((state) => state.todos.error);
  
    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchTodos());
      }
    }, [status, dispatch]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div>
        <h2>Todo List</h2>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  dispatch(updateTodo({
                    id: todo.id,
                    changes: {
                      completed: !todo.completed
                    }
                  }));
                }}
              />
              <span>{todo.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TodoList;