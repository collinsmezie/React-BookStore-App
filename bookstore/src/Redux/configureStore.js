import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import reducer from './Books/books';
import Category from './Categories/categories';

const rootReducer = combineReducers({
  reducer,
  Category,
});

const store = configureStore(rootReducer);

export default store;
