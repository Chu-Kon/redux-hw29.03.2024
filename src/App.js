import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './components/TodoList/TodoList';
import LoginPage from './components/LoginPage/LoginPage';
import { useSelector } from 'react-redux';

const App = () => {
  const { isAuth } = useSelector((state) => state.auth);


  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<LoginPage />} />
        <Route path="/todo-list" element={isAuth ? <TodoList /> : <Navigate to="/registration" />} />
      </Routes>
    </Router>
  );
};

export default App;
