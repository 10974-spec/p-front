// src/App.jsx
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { setUser } from './store/slices/authSlice'
import { authAPI } from './services/api'

// Components
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

// Pages
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/user/Dashboard'
import Tickets from './pages/user/Tickets'
import HostDashboard from './pages/host/Dashboard'
import HostEvents from './pages/host/Events'
import HostScanner from './pages/host/Scanner'
import HostPayouts from './pages/host/Payouts'
import Checkout from './pages/Checkout'
import TicketView from './pages/TicketView'
import Waitlist from './pages/Waitlist'
import Pricing from './pages/Pricing'
import CreateEvent from './pages/host/events/CreateEvent'

// Layout component for routes with navbar and footer
const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-primary-100 flex flex-col">
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </div>
)

// Layout component for auth routes (no navbar/footer)
const AuthLayout = ({ children }) => (
  <div className="min-h-screen bg-primary-100">
    {children}
  </div>
)

// Layout component for host routes (no navbar/footer)
const HostLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {children}
  </div>
)

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const response = await authAPI.getProfile()
          dispatch(setUser(response.data.user))
        } catch (error) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }
    }

    initializeAuth()
  }, [dispatch])

  return (
    <>
      <Routes>
        {/* Auth Routes - No Navbar/Footer */}
        <Route path="/login" element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        } />
        <Route path="/signup" element={
          <AuthLayout>
            <Signup />
          </AuthLayout>
        } />

        {/* Host Routes - No Navbar/Footer */}
        <Route path="/host/*" element={
          <HostLayout>
            <Routes>
              <Route path="/" element={<HostDashboard />} />
              <Route path="/events" element={<HostEvents />} />
              <Route path="/scanner" element={<HostScanner />} />
              <Route path="/payouts" element={<HostPayouts />} />
              <Route path="/events/create" element={<CreateEvent />} />
            </Routes>
          </HostLayout>
        } />

        {/* Create Event Route - Also without navbar/footer */}
        <Route path="/create" element={
          <HostLayout>
            <CreateEvent />
          </HostLayout>
        } />

        {/* Main Routes - With Navbar/Footer */}
        <Route path="/*" element={
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:slug" element={<EventDetails />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Protected User Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/tickets" element={<Tickets />} />

              {/* Checkout Flow */}
              <Route path="/checkout/:eventId" element={<Checkout />} />
              <Route path="/ticket/:bookingId" element={<TicketView />} />
            </Routes>
          </MainLayout>
        } />
      </Routes>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1a1a1a',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
    </>
  )
}

export default App