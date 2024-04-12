import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../../store/slices/authSlice';
import { Navigate } from 'react-router-dom';
import './LoginPage.css';
import { TextInput, PasswordInput, Button } from '@mantine/core';


const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const { name, password } = useSelector((state) => state.auth.user);

  const handleLogin = () => {
    if (formData.username === name && Number(formData.password) === password) {
      dispatch(setIsAuth(true));
    } else {
      setErrorMessage('У вас нет прав доступа!');
    }
  };

  if (isAuth) {
    return <Navigate to="/todo-list" />
  }
  
  return (
    <div>
      <h2>Login Page</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form>
          <TextInput
          className='mantine-username'
          label='Username:' 
          placeholder="username"
          radius="xl"
          value={formData.username}
          onChange={(event) => setFormData({ ...formData, username: event.currentTarget.value })} 
          rightSectionPointerEvents="all"
          mt="md" 
          error={errorMessage ? "Введите правильное имя пользователя" : null}
          >
            </TextInput>

          <PasswordInput 
            className='mantine-password'
            label="Password:"
            placeholder="password"
            radius="xl"
            type="password"
            name="password"
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.currentTarget.value })}
            error={errorMessage ? "Введите верный пароль" : null}>
          </PasswordInput>
          <Button className='mantine-button' variant="filled" size="md" radius="xl" type="button" onClick={handleLogin}>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
