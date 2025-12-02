// src/components/Layout/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { Search, Menu, X, User, LogOut, Calendar, Home, Ticket, Scan, ChevronDown, Settings, CreditCard, Bell } from 'lucide-react'
import SearchBar from '../Search/SearchBar'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
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

    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (isUserDropdownOpen && !e.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isUserDropdownOpen])

  // Generate color based on user's name
  const getUserColor = (name) => {
    const colors = [
      'bg-gradient-to-r from-red-500 to-red-600',
      'bg-gradient-to-r from-blue-500 to-blue-600',
      'bg-gradient-to-r from-green-500 to-green-600',
      'bg-gradient-to-r from-purple-500 to-purple-600',
      'bg-gradient-to-r from-yellow-500 to-yellow-600',
      'bg-gradient-to-r from-pink-500 to-pink-600',
      'bg-gradient-to-r from-indigo-500 to-indigo-600',
    ]
    
    if (!name) return colors[0]
    
    // Simple hash function to get consistent color for same name
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    const index = Math.abs(hash) % colors.length
    return colors[index]
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsMobileMenuOpen(false)
    setIsUserDropdownOpen(false)
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
                          className="btn-secondary text-sm px-4 py-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Host Dashboard
                        </Link>
                      )}
                      <Link 
                        to="/events" 
                        className="btn-primary bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm px-4 py-2 hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25"
                      >
                        Book Event
                      </Link>
                      
                      {/* User Profile Dropdown */}
                      <div className="relative user-dropdown">
                        <button 
                          className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-white/10 transition-all duration-200 group"
                          onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${getUserColor(user?.name)}`}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <ChevronDown className={`w-4 h-4 text-charcoal-400 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {isUserDropdownOpen && (
                            <motion.div
                              className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-red-100 overflow-hidden z-50"
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {/* User Info Header */}
                              <div className="p-4 bg-red-500 border-b border-red-200">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${getUserColor(user?.name)}`}>
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-white">{user?.name}</p>
                                    <p className="text-xs text-white truncate">{user?.email}</p>
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-red-200 text-white text-xs rounded-full capitalize">
                                      {user?.role}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Menu Items */}
                              <div className="py-2">
                                <Link 
                                  to="/dashboard" 
                                  className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-charcoal-700"
                                  onClick={() => setIsUserDropdownOpen(false)}
                                >
                                  <User className="w-4 h-4 text-red-500" />
                                  <span>Dashboard</span>
                                </Link>
                                
                                <Link 
                                  to="/dashboard/profile" 
                                  className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-charcoal-700"
                                  onClick={() => setIsUserDropdownOpen(false)}
                                >
                                  <Settings className="w-4 h-4 text-red-500" />
                                  <span>Profile Settings</span>
                                </Link>
                                
                                {user?.role === 'host' && (
                                  <Link 
                                    to="/host/earnings" 
                                    className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-charcoal-700"
                                    onClick={() => setIsUserDropdownOpen(false)}
                                  >
                                    <CreditCard className="w-4 h-4 text-red-500" />
                                    <span>Earnings</span>
                                  </Link>
                                )}
                                
                                <Link 
                                  to="/dashboard/notifications" 
                                  className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-charcoal-700"
                                  onClick={() => setIsUserDropdownOpen(false)}
                                >
                                  <Bell className="w-4 h-4 text-red-500" />
                                  <span>Notifications</span>
                                </Link>

                                <div className="border-t border-red-100 my-2" />
                                
                                <button
                                  onClick={handleLogout}
                                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-500"
                                >
                                  <LogOut className="w-4 h-4" />
                                  <span>Logout</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Link to="/login" className="btn-secondary border border-red-500 rounded-full text-sm px-4 py-2 hover:bg-red-50 transition-colors">
                        Login
                      </Link>
                      <button 
                        onClick={handleBookEventClick}
                        className="btn-primary bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-sm px-4 py-2 hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25"
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
            {/* Reddish frosted glass effect */}
            <div className="relative rounded-full shadow-floating border border-red-300/30 backdrop-blur-xl overflow-hidden">
              {/* Red tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/15 mix-blend-overlay"></div>
              
              {/* Subtle red pattern for texture */}
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 to-transparent bg-[length:20px_20px]"></div>
              
              {/* Content */}
              <div className="relative flex items-center justify-between px-4 py-3">
                {/* Logo - Compact */}
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 flex-shrink-0 z-10"
                >
                  <img 
                    src="/src/assets/logo2.png" 
                    alt="PASA Logo" 
                    className="size-14" 
                  />
                </Link>

                {/* Search Bar - Compact */}
                <div className="flex-1 max-w-xs mx-4 z-10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="w-full pl-10 pr-4 py-2 rounded-full border border-red-200 bg-white/70 text-red-900 placeholder-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-sm"
                      onClick={() => navigate('/events')}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2 z-10">
                  {quickActions.slice(0, 2).map((action) => (
                    <Link
                      key={action.label}
                      to={action.path}
                      className="p-2 rounded-full hover:bg-red-500/20 transition-colors group"
                      title={action.label}
                    >
                      <action.icon className="w-4 h-4 text-red-700 group-hover:text-red-800 transition-colors" />
                    </Link>
                  ))}
                  
                  {/* Book Event / Get Started Button for Compact Nav */}
                  {isAuthenticated ? (
                    <>
                      {/* User Avatar for Compact Nav */}
                      <button 
                        className="p-1"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${getUserColor(user?.name)}`}>
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      </button>
                      
                      <Link
                        to="/events"
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25"
                      >
                        Book Event
                      </Link>
                    </>
                  ) : (
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-full text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25"
                      onClick={handleBookEventClick}
                    >
                      Get Started
                    </button>
                  )}
                  
                  {/* Mobile Menu Button for Compact Nav */}
                  <button
                    className="p-2 rounded-full hover:bg-red-500/20 transition-colors group lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                    <Menu className="w-4 h-4 text-red-700 group-hover:text-red-800 transition-colors" />
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
              {/* Reddish frosted glass for mobile menu */}
              <div className="relative rounded-2xl p-6 shadow-2xl border border-red-300/30 backdrop-blur-xl overflow-hidden">
                {/* Red tint overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 to-red-600/20 mix-blend-overlay"></div>
                
                {/* Subtle red pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 to-transparent bg-[length:25px_25px]"></div>
                
                <div className="relative space-y-3 z-10">
                  {isAuthenticated ? (
                    <>
                      {/* User Info with Avatar */}
                      <div className="text-center mb-4 pb-4 border-b border-red-300/20">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3 ${getUserColor(user?.name)} shadow-lg`}>
                          {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <p className="font-bold text-red-900 text-lg">{user?.name}</p>
                        <p className="text-red-600 text-sm">{user?.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-red-300 text-white text-xs rounded-full capitalize">
                          {user?.role}
                        </span>
                      </div>

                      {/* Quick Actions Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {quickActions.map((action) => (
                          <Link
                            key={action.label}
                            to={action.path}
                            className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-b from-white to-red-50 hover:from-red-50 hover:to-red-100 transition-all text-red-900 border border-red-200 shadow-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <action.icon className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">{action.label}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 text-red-900 py-3 px-4 rounded-xl bg-gradient-to-r from-white to-red-50 hover:from-red-50 hover:to-red-100 transition-all border border-red-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <User className="w-5 h-5" />
                          <span className="font-medium">Dashboard</span>
                        </Link>
                        
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center space-x-3 text-red-900 py-3 px-4 rounded-xl bg-gradient-to-r from-white to-red-50 hover:from-red-50 hover:to-red-100 transition-all border border-red-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="w-5 h-5" />
                          <span className="font-medium">Profile Settings</span>
                        </Link>
                        
                        {user?.role === 'host' && (
                          <Link
                            to="/host"
                            className="flex items-center space-x-3 text-red-900 py-3 px-4 rounded-xl bg-gradient-to-r from-white to-red-50 hover:from-red-50 hover:to-red-100 transition-all border border-red-200"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">Host Dashboard</span>
                          </Link>
                        )}
                      </div>

                      <div className="pt-3 border-t border-red-300/20">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center space-x-3 text-white py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="font-medium">Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block text-red-700 py-4 px-4 rounded-full hover:bg-red-500/20 transition-colors text-center border border-red-300 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <button
                        onClick={handleBookEventClick}
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-4 rounded-full hover:from-red-600 hover:to-red-700 transition-all text-center font-semibold shadow-lg shadow-red-500/25"
                      >
                        Get Started
                      </button>
                      
                      {/* Quick Actions for Non-Authenticated */}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-red-300/20">
                        {quickActions.slice(0, 2).map((action) => (
                          <Link
                            key={action.label}
                            to={action.path}
                            className="flex flex-col items-center p-3 rounded-xl hover:bg-red-500/20 transition-colors text-red-900 border border-red-200/50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <action.icon className="w-5 h-5 mb-1" />
                            <span className="text-xs font-medium">{action.label}</span>
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
              className="bg-white rounded-3xl p-8 max-w-sm w-full mx-auto shadow-2xl border border-red-100"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center mb-6">
                
                <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                  Welcome to PASA!
                </h3>
                <p className="text-charcoal-600">
                  Choose how you'd like to begin your event journey
                </p>
              </div>

              <div className="space-y-3">
                {/* Sign Up Button */}
                <button
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 shadow-lg shadow-red-500/25"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>

                {/* View Pricing Button */}
                <button
                  className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-600 font-semibold py-4 px-6 rounded-full transition-all duration-200"
                  onClick={handleViewPricing}
                >
                  View Pricing
                </button>

                {/* Cancel Button */}
                <button
                  className="w-full text-charcoal-500 hover:text-charcoal-700 font-semibold py-3 px-6 rounded-full transition-all duration-200 hover:bg-red-50"
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