import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return id;
  }
);
