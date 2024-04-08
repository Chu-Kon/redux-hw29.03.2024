import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../store/slices/fetchTodosSlice';
import { updateTodo } from '../../store/slices/updateTodoSlice';
import { removeTodo } from '../../store/slices/removeTodoSlice';
import './TodoList.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (status === 'ready' && isAuth) {
      dispatch(fetchTodos());
    }
  }, [status, dispatch, isAuth]);

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
            <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
