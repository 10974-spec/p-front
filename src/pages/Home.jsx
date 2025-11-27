// src/pages/Home.jsx
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Calendar, Ticket, Users, Star, ChevronLeft, ChevronRight, Menu, User, Eye, X, MapPin, ArrowRight } from 'lucide-react'

const Home = () => {
  const [activeEvent, setActiveEvent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const featuredEvents = [
    {
      id: 1,
      slug: 'summer-music-festival',
      title: 'Summer Music Festival 2024',
      category: 'Music',
      dateStart: '2024-07-15T18:00:00Z',
      venue: { name: 'Central Park' },
      mainImage: '/src/assets/event1.jpeg',
      ticketTiers: [
        { name: 'General Admission', price: 5000 },
        { name: 'VIP', price: 12000 }
      ],
      attendees: [
        '/src/assets/avatar1.jpeg',
        '/src/assets/avatar2.jpeg',
        '/src/assets/avatar3.jpeg',
        '/src/assets/avatar4.jpeg'
      ],
      totalAttendees: 1247,
      description: 'Join us for the biggest summer music festival featuring top artists and amazing performances.'
    },
    {
      id: 2,
      slug: 'tech-conference-2024',
      title: 'Tech Innovation Conference',
      category: 'Business',
      dateStart: '2024-08-20T09:00:00Z',
      venue: { name: 'Convention Center' },
      mainImage: '/src/assets/event2.jpeg',
      ticketTiers: [
        { name: 'Standard', price: 7500 },
        { name: 'Premium', price: 15000 }
      ],
      attendees: [
        '/src/assets/avatar1.jpeg',
        '/src/assets/avatar2.jpeg',
        '/src/assets/avatar3.jpeg'
      ],
      totalAttendees: 387,
      description: 'Explore the latest in technology and innovation with industry leaders and pioneers.'
    },
    {
      id: 3,
      slug: 'art-exhibition',
      title: 'Modern Art Exhibition',
      category: 'Arts',
      dateStart: '2024-09-10T10:00:00Z',
      venue: { name: 'Art Gallery Downtown' },
      mainImage: '/src/assets/event3.jpeg',
      ticketTiers: [
        { name: 'General', price: 3000 },
        { name: 'Student', price: 1500 }
      ],
      attendees: [
        '/src/assets/avatar2.jpeg',
        '/src/assets/avatar3.jpeg',
        '/src/assets/avatar4.jpeg',
        '/src/assets/avatar1.jpeg'
      ],
      totalAttendees: 892,
      description: 'Experience contemporary art from emerging and established artists in a stunning gallery setting.'
    },
    {
      id: 4,
      slug: 'food-festival',
      title: 'International Food Festival',
      category: 'Food & Drink',
      dateStart: '2024-10-05T12:00:00Z',
      venue: { name: 'Waterfront Park' },
      mainImage: '/src/assets/event1.jpeg',
      ticketTiers: [
        { name: 'Tasting Pass', price: 4500 },
        { name: 'VIP Experience', price: 9000 }
      ],
      attendees: [
        '/src/assets/avatar1.jpeg',
        '/src/assets/avatar2.jpeg',
        '/src/assets/avatar3.jpeg'
      ],
      totalAttendees: 567,
      description: 'Taste culinary delights from around the world in this vibrant food celebration.'
    }
  ]

  const features = [
    {
      icon: Ticket,
      title: 'Instant Ticket Generation',
      description: 'Generate beautiful QR tickets instantly after payment confirmation.'
    },
    {
      icon: Calendar,
      title: 'Easy Event Creation',
      description: 'Create and manage events in minutes with our intuitive host dashboard.'
    },
    {
      icon: Users,
      title: 'Smart Analytics',
      description: 'Track sales, attendance, and revenue with real-time analytics.'
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Delight your attendees with seamless ticketing and entry experience.'
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % featuredEvents.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredEvents.length])

  const nextEvent = () => {
    setActiveEvent((prev) => (prev + 1) % featuredEvents.length)
    setIsAutoPlaying(false)
  }

  const prevEvent = () => {
    setActiveEvent((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length)
    setIsAutoPlaying(false)
  }

  const goToEvent = (index) => {
    setActiveEvent(index)
    setIsAutoPlaying(false)
  }

  // Handle modal state with localStorage
  const handleModalOpen = () => {
    localStorage.setItem('isModalOpen', 'true')
    window.dispatchEvent(new Event('storage'))
  }

  const handleModalClose = () => {
    localStorage.setItem('isModalOpen', 'false')
    window.dispatchEvent(new Event('storage'))
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    handleModalOpen()
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
    handleModalClose()
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedEvent) {
        handleCloseModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [selectedEvent])

  return (
    <div className="min-h-screen">
      {/* Fixed Mobile Navigation */}
      <section className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-200 lg:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-primary-100 text-charcoal-700 hover:bg-green-500 hover:text-white transition-all duration-300"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Center: Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-charcoal-900">Pasa</span>
            </Link>

            {/* Right: User Icon or Get Started */}
            <div className="flex items-center space-x-2">
              <Link 
                to="/signup" 
                className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute left-4 right-4 top-16 bg-white rounded-2xl shadow-2xl border border-primary-200 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 space-y-2">
                  <Link 
                    to="/pricing" 
                    className="block px-4 py-3 text-charcoal-700 hover:bg-primary-50 rounded-xl transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View Pricing
                  </Link>
                  <Link 
                    to="/login" 
                    className="block px-4 py-3 text-charcoal-700 hover:bg-primary-50 rounded-xl transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link 
                    to="/events" 
                    className="block px-4 py-3 text-charcoal-700 hover:bg-primary-50 rounded-xl transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse Events
                  </Link>
                  <Link 
                    to="/host" 
                    className="block px-4 py-3 text-charcoal-700 hover:bg-primary-50 rounded-xl transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Event
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
       
      {/* Hero Section */}
      <section className=" relative min-h-screen flex items-center justify-center px-6 pt-12 lg:pt-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50" />
        
        {/* Mobile Carousel */}
        <div className="lg:hidden w-full max-w-4xl relative z-10">
          <div className="relative h-[75vh] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {featuredEvents.map((event, index) => (
                index === activeEvent && (
                  <motion.div
                    key={event.id}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-full max-w-sm">
                      <motion.div
                        className="relative rounded-3xl overflow-hidden shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={event.mainImage}
                          alt={event.title}
                          className="w-full h-96 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-xl font-bold mb-2 line-clamp-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">
                                {new Date(event.dateStart).toLocaleDateString()}
                              </span>
                            </div>
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              ${(event.ticketTiers[0].price / 100).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <div className="flex items-center">
                            <div className="flex -space-x-2">
                              {event.attendees.slice(0, 3).map((avatar, idx) => (
                                <img
                                  key={idx}
                                  src={avatar}
                                  alt={`Attendee ${idx + 1}`}
                                  className="w-8 h-8 rounded-full border-2 border-white"
                                />
                              ))}
                            </div>
                            {event.totalAttendees > 3 && (
                              <span className="ml-2 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded-full">
                                +{event.totalAttendees - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link
                          to={`/events/${event.slug}`}
                          className="btn-primary bg-red-500 w-full py-4 rounded-full text-lg font-semibold flex items-center justify-center space-x-2"
                        >
                          <span>Get Tickets</span>
                          <Ticket className="w-5 h-5" />
                        </Link>
                      </motion.div>

                      <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link 
                          to="/events" 
                          className="inline-flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm text-red-600 w-full px-6 py-3 rounded-full font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 border border-green-200"
                        >
                          <span>View All Events</span>
                          <Calendar className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            <button
              onClick={prevEvent}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg z-20"
            >
              <ChevronLeft className="w-6 h-6 text-charcoal-700" />
            </button>
            <button
              onClick={nextEvent}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg z-20"
            >
              <ChevronRight className="w-6 h-6 text-charcoal-700" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {featuredEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToEvent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeEvent ? 'bg-red-500 scale-125' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Hero */}
        <div className="hidden lg:block relative z-10 text-center max-w-4xl">
          <img 
            src="/src/assets/bg1.png" 
            alt="PASA Logo" 
            className="size-14 mt-11 " 
          />
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold text-charcoal-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create, share, and sell tickets —{' '}
            <span className="text-red-500">all in one link.</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-charcoal-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The next-generation event ticketing platform for creators and attendees.
          </motion.p>
          
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="search-bar-glass px-6 py-4 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <Search className="w-5 h-5 text-charcoal-500" />
                  <div>
                    <p className="text-lg font-medium text-charcoal-700">Find amazing events</p>
                    <p className="text-sm text-charcoal-500">Search by location, date, or category</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/events" className="btn-primary bg-red-500 rounded-full text-lg px-8 py-4">
              Browse Events
            </Link>
            <Link to="/host" className="btn-secondary border border-red-500 rounded-full text-lg px-8 py-4">
              Create Event
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Desktop Only Sections */}
      <div className="hidden lg:block">
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="rounded-3xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-display font-bold text-black mb-4">
                  Featured Events
                </h2>
                <p className="text-xl text-black">
                  Discover amazing events happening near you
                </p>
              </motion.div>

              <motion.div
                className="relative mb-16"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="relative w-full h-[500px] overflow-hidden">
                    <img
                      src={featuredEvents[0].mainImage}
                      alt={featuredEvents[0].title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/fallback-event.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  </div>
                  
                  <div className="absolute inset-0 flex items-end p-8 text-white">
                    <div className="max-w-2xl">
                      <h3 className="text-4xl font-display font-bold mb-4 leading-tight">
                        {featuredEvents[0].title}
                      </h3>
                      <div className="flex items-center gap-6 mb-4 text-lg flex-wrap">
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                          <Calendar className="w-5 h-5" />
                          <span>{new Date(featuredEvents[0].dateStart).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full">
                          <MapPin className="w-5 h-5" />
                          <span>{featuredEvents[0].venue.name}</span>
                        </div>
                        <div className="bg-accent-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          {featuredEvents[0].category}
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-accent-300 mb-6">
                        From ${(featuredEvents[0].ticketTiers[0].price / 100).toFixed(2)}
                      </p>
                      <Link
                        to={`/events/${featuredEvents[0].slug}`}
                        className="bg-white text-red-500 rounded-full px-8 py-4 text-lg font-semibold inline-flex items-center space-x-2 hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <span>Get Tickets</span>
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredEvents.slice(1, 4).map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="group relative cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                      <img
                        src={event.mainImage}
                        alt={event.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = '/assets/fallback-event.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4 inline-block">
                            <Eye className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-white font-semibold text-lg">View Details</p>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Link 
                  to="/events" 
                  className="bg-red-500 text-white rounded-full px-8 py-4 text-lg font-semibold inline-flex items-center space-x-2 hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span>View All Events</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6 bg-primary-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
                Why Choose Pasa?
              </h2>
              <p className="text-xl text-charcoal-600">
                Everything you need to create and manage successful events
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-red-500 m-8 rounded-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl font-display font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Ready to Create Your Next Event?
            </motion.h2>
            <motion.p
              className="text-xl text-green-100 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of creators who trust EventFlow for their ticketing needs
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                to="/host"
                className="bg-white text-red-500 rounded-full px-8 py-4 text-lg font-semibold inline-flex items-center space-x-2 hover:bg-primary-50 transition-all duration-300"
              >
                <span>Start Creating</span>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Modal for Event Details */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white rounded-3xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48">
                <img
                  src={selectedEvent.mainImage}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-3">
                  {selectedEvent.title}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent-500" />
                    <span className="text-sm">{new Date(selectedEvent.dateStart).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent-500" />
                    <span className="text-sm">{selectedEvent.venue.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded-full text-xs font-medium">
                      {selectedEvent.category}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-sm mb-2">Ticket Prices</h4>
                  <div className="space-y-1">
                    {selectedEvent.ticketTiers.map((tier, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{tier.name}</span>
                        <span className="font-bold text-accent-600">
                          ${(tier.price / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/events/${selectedEvent.slug}`}
                    className="flex-1 bg-red-500 text-white text-center rounded-full px-4 py-2 text-sm font-semibold hover:bg-red-600 transition-all duration-300"
                    onClick={handleCloseModal}
                  >
                    View Full Details
                  </Link>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-200 text-gray-700 text-center rounded-full px-4 py-2 text-sm font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home