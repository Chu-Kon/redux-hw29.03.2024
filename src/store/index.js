import { configureStore } from '@reduxjs/toolkit';
import todosSlice from './slices/todosSlice';

export default configureStore({
    reducer:{
        todos: todosSlice
    }
})