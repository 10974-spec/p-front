// src/pages/Home.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Calendar, Ticket, Users, Star } from 'lucide-react'
import EventCard from '../components/Event/EventCard'

const Home = () => {
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
      { price: 5000, totalQty: 1000, remainingQty: 250 }
    ]
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
      { price: 7500, totalQty: 500, remainingQty: 150 }
    ]
  },
    {
    id: 3,
    slug: 'tech-conference-2024',
    title: 'Tech Innovation Conference',
    category: 'Business',
    dateStart: '2024-08-20T09:00:00Z',
    venue: { name: 'Convention Center' },
    mainImage: '/src/assets/event3.jpeg',
    ticketTiers: [
      { price: 7500, totalQty: 500, remainingQty: 150 }
    ]
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-primary-50 to-accent-50" />
        <div className="relative z-10 text-center max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold text-charcoal-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create, share, and sell tickets —{' '}
            <span className="text-green-500">all in one link.</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-charcoal-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The next-generation event ticketing platform for creators and attendees.
          </motion.p>

          {/* Floating Search Bar */}
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
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
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
            <Link to="/events" className="btn-primary bg-green-500 rounded-full text-lg px-8 py-4">
              Browse Events
            </Link>
            <Link to="/host" className="btn-secondary rounded-full text-lg px-8 py-4">
              Create Event
            </Link>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-accent-200 rounded-full opacity-20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-16 h-16 bg-primary-300 rounded-full opacity-30"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
              Why Choose PASA?
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Everything you need to create unforgettable event experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-accent-500" />
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
     <section className="py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <motion.div
      className="bg-green-200 rounded-3xl p-12"
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
        <h2 className="text-4xl font-display font-bold text-white mb-4">
          Featured Events
        </h2>
        <p className="text-xl text-white">
          Discover amazing events happening near you
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Event Image */}
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <img
                src={event.mainImage}
                alt={event.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Details Card - Appears on hover */}
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10"
              initial={false}
            >
              <h3 className="font-semibold text-charcoal-900 text-lg mb-2 line-clamp-2">
                {event.title}
              </h3>
              <div className="space-y-2 text-sm text-charcoal-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Category:</span>
                  <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded-full text-xs">
                    {event.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{new Date(event.dateStart).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Venue:</span>
                  <span className="text-right">{event.venue.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Price:</span>
                  <span className="font-bold text-accent-600">
                    ${(event.ticketTiers[0].price / 100).toFixed(2)}
                  </span>
                </div>
              </div>
              <Link
                to={`/events/${event.slug}`}
                className="btn-primary bg-green-500 w-full mt-8 py-2 text-sm"
              >
                View Details
              </Link>
            </motion.div>

            {/* Static minimal info (always visible) */}
            <div className="text-center">
              <h3 className="font-semibold text-charcoal-900 text-lg mb-1 line-clamp-2">
                {event.title}
              </h3>
              <p className="text-accent-600 font-medium">
                ${(event.ticketTiers[0].price / 100).toFixed(2)}
              </p>
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
        <Link to="/events" className="btn-primary bg-green-500 rounded-full">
          View All Events
        </Link>
      </motion.div>
    </motion.div>
  </div>
</section>
    </div>
  )
}

export default Home