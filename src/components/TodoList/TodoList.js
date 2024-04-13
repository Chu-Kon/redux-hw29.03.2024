import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../../store/slices/fetchTodosSlice';
import { updateTodo } from '../../store/slices/updateTodoSlice';
import { removeTodo } from '../../store/slices/removeTodoSlice';
import './TodoList.css';
import { Button, Loader } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const TodoList = () => {
  const { t } = useTranslation('todo');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (status === 'ready' && isAuth) {
      dispatch(fetchTodos());
    }
  }, [status, dispatch, isAuth]);

  const handleDeleteTodo = async (id) => {
    setDeleteLoading((prev) => ({ ...prev, [id]: true }));
    await dispatch(removeTodo(id));
    setDeleteLoading((prev) => ({ ...prev, [id]: false }));
  }


  if (status === 'loading') {
    return <Loader className='mantine-loader' color="blue" size="lg" />;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className='todo-container'>
      <h2>{t('todo-title')}</h2>
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
            <Button 
              className='delete-button' 
              variant="filled" 
              color="red" 
              radius="xl" 
              size="xs" 
              onClick={() => handleDeleteTodo(todo.id)}
              // onClick={() => dispatch(removeTodo(todo.id))}
              loading={deleteLoading[todo.id]}
              loaderProps={{ type: 'dots' }}
            >
                {t('delete-button')}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
