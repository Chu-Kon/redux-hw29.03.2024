import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList/TodoList';
import LoginPage from './components/LoginPage/LoginPage';
import Header from './components/Header';
import { useSelector } from 'react-redux';
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core';

const App = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return (
    <MantineProvider>
      <Header></Header>
      <Router>
        <Routes>
          <Route path="/registration" element={<LoginPage />} />
          <Route path="/todo-list" element={isAuth ? <TodoList /> : <Navigate to="/registration" />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
};

export default App;
