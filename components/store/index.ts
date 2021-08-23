
import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import layout from './layout';
import ticket from './ticket';
import ruler from './ruler';

const store = configureStore({
  reducer: {
    layout,
    ticket,
    ruler,
  }
});

const wrapper = createWrapper<Store>((context: Context) => { return store; }, {debug: true});

export default wrapper;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch