// src/services/api.js
import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        })

        const { accessToken } = response.data.tokens
        localStorage.setItem('accessToken', accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    // Show error toast for non-401 errors
    if (error.response?.status >= 400 && error.response?.status !== 401) {
      const message = error.response?.data?.error || 'Something went wrong'
      toast.error(message)
    }

    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/users/me'),
  updateProfile: (userData) => api.put('/users/me', userData),
}

// Events API
export const eventsAPI = {
  getEvents: (filters = {}) => api.get('/events', { params: filters }),
  getEventBySlug: (slug) => api.get(`/events/${slug}`),
  createEvent: (eventData) => api.post('/events', eventData),
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  getHostEvents: (hostId) => api.get(`/hosts/${hostId}/events`),
}

// Bookings API
export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  get: (id) => api.get(`/bookings/${id}`),
  getUserBookings: () => api.get('/bookings/user'),
  cancel: (id) => api.delete(`/bookings/${id}`),
}

// Payments API
export const paymentsAPI = {
  initiate: (paymentData) => api.post('/payments/initiate', paymentData),
  confirm: (paymentData) => api.post('/payments/confirm', paymentData),
}

// QR API
export const qrAPI = {
  validate: (tokenData) => api.post('/qr/validate', tokenData),
  generate: (bookingData) => api.post('/qr/generate', bookingData),
  getEventBuyers: (hostId, eventId) => api.get(`/hosts/${hostId}/buyers/${eventId}`),
}

// Payouts API
export const payoutsAPI = {
  request: (payoutData) => api.post('/payouts/request', payoutData),
  getHostPayouts: () => api.get('/payouts/host'),
}

export default api