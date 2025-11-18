// src/store/slices/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { eventsAPI } from '../../services/api'

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.getEvents(filters)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch events')
    }
  }
)

export const fetchEventBySlug = createAsyncThunk(
  'events/fetchEventBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await eventsAPI.getEventBySlug(slug)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch event')
    }
  }
)

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    currentEvent: null,
    loading: false,
    error: null,
    filters: {
      category: '',
      search: '',
      dateFrom: '',
      dateTo: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        search: '',
        dateFrom: '',
        dateTo: '',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.events = action.payload.events
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchEventBySlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEventBySlug.fulfilled, (state, action) => {
        state.loading = false
        state.currentEvent = action.payload.event
      })
      .addCase(fetchEventBySlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setFilters, clearFilters } = eventsSlice.actions
export default eventsSlice.reducer