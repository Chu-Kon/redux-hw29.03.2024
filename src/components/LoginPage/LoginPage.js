import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuth } from '../../store/slices/authSlice';
import { Navigate } from 'react-router-dom';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import './LoginPage.css';


const LoginPage = () => {
  const { t } = useTranslation('login');
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const { name, password } = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(t('error-message'));
    }
  }, [errorMessage, t]);

  const handleLogin = () => {
    if (formData.username === name && Number(formData.password) === password) {
      dispatch(setIsAuth(true));
    } else {
      setErrorMessage(t('error-message'));
    }
  };

  if (isAuth) {
    return <Navigate to='/todo-list' />
  }
  
  return (
    <div>
      <h2 className='login-title'>{t('login-title')}</h2>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <form>
          <TextInput
          className='mantine-username'
          label={t('user-name')} 
          placeholder={t('username-placeholder')} 
          radius='xl'
          value={formData.username}
          onChange={(event) => setFormData({ ...formData, username: event.currentTarget.value })} 
          rightSectionPointerEvents='all'
          mt='md' 
          error={errorMessage ? t('username-error') : null}
          >
            </TextInput>

          <PasswordInput 
            className='mantine-password'
            label={t('password')}
            placeholder={t('password-placeholder')} 
            radius='xl'
            type='password'
            name='password'
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.currentTarget.value })}
            error={errorMessage ? t('password-error')  : null}>
          </PasswordInput>
          <Button className='mantine-button' variant='filled' size='md' radius='xl' type='button' onClick={handleLogin}>{t('login-button')}</Button>
      </form>
    </div>
  );
};

export default LoginPage;
