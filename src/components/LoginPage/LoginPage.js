import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../../store/slices/authSlice';
import TodoList from '../TodoList/TodoList';
import { Navigate } from 'react-router-dom';
import './LoginPage.css';


const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const { name, password } = useSelector((state) => state.auth.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    if (formData.username === name && Number(formData.password) === password) {
      dispatch(setIsAuth(true));
    } else {
      setErrorMessage('У вас нет прав доступа!');
    }
  };

  if (isAuth) {
    return <Navigate to="/todo-list" />
    // return <TodoList />;
  }

  return (
    <div>
      <h2>Login Page</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
