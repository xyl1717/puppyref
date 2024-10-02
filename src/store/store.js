import { configureStore } from '@reduxjs/toolkit';
import api from './api';

export const store = configureStore({
  reducer: {
    // Add the api reducer
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Add api middleware for cache handling and automatic re-fetching
    getDefaultMiddleware().concat(api.middleware),
});
