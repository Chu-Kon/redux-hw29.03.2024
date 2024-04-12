import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos } from './fetchTodosSlice';
import { updateTodo } from './updateTodoSlice';
import { removeTodo } from './removeTodoSlice';

const initialState = {
  items: [],
  status: 'ready',
  error: null,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState, 
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const { id, changes } = action.payload;
        const existingTodo = state.items.find(todo => todo.id === id);
        if (existingTodo) {
          existingTodo.completed = changes.completed;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
  }
});


export default todosSlice.reducer;
// { } деструктуризация объекта actions, извлекаем все свойства без изменений
export const { } = todosSlice.actions;