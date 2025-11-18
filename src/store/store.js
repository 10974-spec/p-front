// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import eventsSlice from './slices/eventsSlice'
import bookingsSlice from './slices/bookingsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    events: eventsSlice,
    bookings: bookingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})