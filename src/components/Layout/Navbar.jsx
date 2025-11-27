// src/components/Layout/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { Search, Menu, X, User, LogOut, Calendar, Home, Ticket, Scan } from 'lucide-react'
import SearchBar from '../Search/SearchBar'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    // Listen for storage changes (modal state)
    const handleStorageChange = () => {
      const modalState = localStorage.getItem('isModalOpen')
      setIsModalOpen(modalState === 'true')
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('storage', handleStorageChange)
    
    // Initial check
    handleStorageChange()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const handleBookEventClick = () => {
    setShowPricingModal(true)
  }

  const handleSignUp = () => {
    navigate('/signup')
    setShowPricingModal(false)
  }

  const handleViewPricing = () => {
    navigate('/pricing')
    setShowPricingModal(false)
  }

  const handleCancel = () => {
    setShowPricingModal(false)
  }

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  }

  const compactNavbarVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  }

  // Quick actions for compact navbar
  const quickActions = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/events' },
    { icon: Ticket, label: 'Tickets', path: '/dashboard/tickets' },
    { icon: Scan, label: 'Scan', path: '/host/scanner' },
  ]

  // Determine if compact navbar should be visible
  const shouldShowCompactNavbar = (isScrolled || window.innerWidth < 1024) && !isModalOpen
  const shouldShowMainNavbar = !isScrolled && !isModalOpen

  return (
    <>
      {/* Main Navbar - Shows only on large devices when not scrolled */}
      <AnimatePresence>
        {shouldShowMainNavbar && (
          <motion.nav
            className="hidden lg:block fixed top-4 left-0 right-0 mx-auto w-11/12 max-w-6xl z-50"
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="glass rounded-full shadow-floating border border-white/20 backdrop-blur-xl">
              <div className="flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link 
                  to="/" 
                  className="flex items-center flex-shrink-0 p-0 m-0"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <img 
                    src="/src/assets/logo2.png" 
                    alt="PASA Logo" 
                    className="size-24 object-cover" 
                  />
                </Link>

                {/* Search Bar - Desktop */}
                <div className="flex-1 max-w-2xl mx-8">
                  <SearchBar />
                </div>

                {/* Navigation Links - Desktop */}
                <div className="flex items-center space-x-3">
                  {isAuthenticated ? (
                    <>
                      {user?.role === 'host' && (
                        <Link 
                          to="/host" 
                          className="btn-secondary text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Host Dashboard
                        </Link>
                      )}
                      <Link 
                          to="/events" 
                          className="btn-primary bg-red-500 rounded-full text-sm"
                        >
                          Book Event
                        </Link>
                      <div className="relative group">
                        <button className="flex items-center space-x-2 glass px-4 py-2 rounded-xl min-w-0">
                          <User className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate max-w-32">{user?.name}</span>
                        </button>
                        <div className="absolute right-0 top-full mt-2 w-48 glass rounded-xl shadow-floating opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/20 backdrop-blur-xl">
                          <Link 
                            to="/dashboard" 
                            className="block px-4 py-3 hover:bg-white/30 rounded-xl transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 hover:bg-white/30 rounded-xl flex items-center space-x-2 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Link to="/login" className="btn-secondary border border-red-500 rounded-full text-sm">
                        Login
                      </Link>
                      <button 
                        onClick={handleBookEventClick}
                        className="btn-primary bg-red-500 rounded-full text-sm"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Compact Navbar - Shows on all devices when scrolled, and always on mobile, but hides when modal is open */}
      <AnimatePresence>
        {shouldShowCompactNavbar && (
          <motion.nav
            className="fixed bottom-6 left-0 right-0 mx-auto rounded-full w-11/12 max-w-md z-50 lg:w-11/12 lg:max-w-2xl"
            variants={compactNavbarVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="glass rounded-full shadow-floating border border-red-800 backdrop-blur-xl">
              <div className="flex items-center justify-between px-4 py-3">
                {/* Logo - Compact */}
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 flex-shrink-0"
                >
                  <img 
                    src="/src/assets/logo2.png" 
                    alt="PASA Logo" 
                    className="size-14" 
                  />
                </Link>

                {/* Search Bar - Compact */}
                <div className="flex-1 max-w-xs mx-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="w-full pl-10 pr-4 py-2 rounded-full border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-sm bg-white/50"
                      onClick={() => navigate('/events')}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  {quickActions.slice(0, 2).map((action) => (
                    <Link
                      key={action.label}
                      to={action.path}
                      className="p-2 rounded-full hover:bg-white/30 transition-colors"
                      title={action.label}
                    >
                      <action.icon className="w-4 h-4 text-charcoal-700" />
                    </Link>
                  ))}
                  
                  {/* Book Event / Get Started Button for Compact Nav */}
                  {isAuthenticated ? (
                    <Link
                      to="/events"
                      className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
                    >
                      Book Event
                    </Link>
                  ) : (
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                      onClick={handleBookEventClick}
                    >
                      Get Started
                    </button>
                  )}
                  
                  {/* Mobile Menu Button for Compact Nav */}
                  <button
                    className="p-2 rounded-full hover:bg-white/30 transition-colors lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <Menu className="w-4 h-4 text-charcoal-700" />
                  </button>
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm z-50 lg:hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="glass-dark rounded-2xl p-6 shadow-2xl border border-white/10 backdrop-blur-xl">
                <div className="space-y-3">
                  {isAuthenticated ? (
                    <>
                      {/* User Info */}
                      <div className="text-center mb-4 pb-4 border-b border-white/10">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-semibold text-white text-lg">{user?.name}</p>
                        <p className="text-primary-200 text-sm">{user?.email}</p>
                        <p className="text-green-300 text-xs mt-1 capitalize">{user?.role}</p>
                      </div>

                      {/* Quick Actions Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {quickActions.map((action) => (
                          <Link
                            key={action.label}
                            to={action.path}
                            className="flex flex-col items-center p-3 rounded-xl hover:bg-white/10 transition-colors text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <action.icon className="w-5 h-5 mb-1" />
                            <span className="text-xs">{action.label}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Menu Items */}
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 text-white py-3 px-4 rounded-xl hover:bg-white/10 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span>Dashboard</span>
                      </Link>
                      
                      {user?.role === 'host' && (
                        <Link
                          to="/host"
                          className="flex items-center space-x-3 text-white py-3 px-4 rounded-xl hover:bg-white/10 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Calendar className="w-5 h-5" />
                          <span>Host Dashboard</span>
                        </Link>
                      )}

                      <div className="pt-3 border-t border-white/10">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 text-white py-3 px-4 rounded-full hover:bg-red-500/20 transition-colors"
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block text-white py-4 px-4 rounded-full hover:bg-white/10 transition-colors text-center border border-white/20"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <button
                        onClick={handleBookEventClick}
                        className="w-full bg-red-500 text-white py-4 px-4 rounded-full hover:bg-red-600 transition-colors text-center"
                      >
                        Get Started
                      </button>
                      
                      {/* Quick Actions for Non-Authenticated */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                        {quickActions.slice(0, 2).map((action) => (
                          <Link
                            key={action.label}
                            to={action.path}
                            className="flex flex-col items-center p-3 rounded-xl hover:bg-white/10 transition-colors text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <action.icon className="w-5 h-5 mb-1" />
                            <span className="text-xs">{action.label}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pricing Modal - Only shows for non-authenticated users */}
      <AnimatePresence>
        {showPricingModal && !isAuthenticated && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-sm w-full mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                  Get Started
                </h3>
                <p className="text-charcoal-600">
                  Choose how you'd like to begin your event journey
                </p>
              </div>

              <div className="space-y-3">
                {/* Sign Up Button */}
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-full transition-all duration-200"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>

                {/* View Pricing Button */}
                <button
                  className="w-full border-2 border-red-500 text-red-500 hover:bg-green-50 font-semibold py-4 px-6 rounded-full transition-all duration-200"
                  onClick={handleViewPricing}
                >
                  View Pricing
                </button>

                {/* Cancel Button */}
                <button
                  className="w-full text-charcoal-500 hover:text-charcoal-700 font-semibold py-3 px-6 rounded-full transition-all duration-200"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going behind navbar */}
      <div className="pt-24 lg:pt-0"></div>
    </>
  )
}

export default Navbar