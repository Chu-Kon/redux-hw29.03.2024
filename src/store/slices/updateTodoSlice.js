import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, changes }) => {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, changes);
    return { id, changes };
  }
);