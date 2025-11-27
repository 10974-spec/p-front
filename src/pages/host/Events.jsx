// src/pages/host/Events.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus, Users, Calendar, MapPin, Edit, Trash2, ArrowRight, Ticket } from 'lucide-react'
import { format } from 'date-fns'

const HostEvents = () => {
  const events = [
    {
      id: 1,
      title: 'Summer Music Festival 2024',
      date: '2024-07-15T18:00:00Z',
      venue: 'Central Park',
      status: 'published',
      ticketsSold: 850,
      totalTickets: 1000,
      revenue: '$8,500',
      image: '/src/assets/event1.jpeg',
      category: 'Music'
    },
    {
      id: 2,
      title: 'Tech Innovation Conference',
      date: '2024-08-20T09:00:00Z',
      venue: 'Convention Center',
      status: 'published',
      ticketsSold: 397,
      totalTickets: 500,
      revenue: '$4,080',
      image: '/src/assets/event2.jpeg',
      category: 'Business'
    },
    {
      id: 3,
      title: 'Art Exhibition Opening',
      date: '2024-09-05T17:00:00Z',
      venue: 'Modern Art Museum',
      status: 'draft',
      ticketsSold: 0,
      totalTickets: 200,
      revenue: '$0',
      image: '/src/assets/event3.jpeg',
      category: 'Arts'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'published':
        return 'Published'
      case 'draft':
        return 'Draft'
      case 'cancelled':
        return 'Cancelled'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8 mt-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-2">
              My Events
            </h1>
            <p className="text-xl text-charcoal-600">
              Create and manage your events
            </p>
          </div>
          <Link
            to="/create"
            className="btn-primary bg-red-500 flex items-center space-x-2 mt-4 lg:mt-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </Link>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Main Event Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)} backdrop-blur-sm`}>
                    {getStatusText(event.status)}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                </div>

                {/* Hover Overlay Content */}
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(event.date), 'MMM dd')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Card - Slides up on hover */}
              <motion.div
                className="bg-white p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 absolute bottom-0 left-0 right-0"
                initial={false}
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Ticket className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-lg font-bold text-charcoal-900">
                      {event.ticketsSold}
                    </p>
                    <p className="text-xs text-charcoal-600">Sold</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-lg font-bold text-charcoal-900">
                      {event.totalTickets}
                    </p>
                    <p className="text-xs text-charcoal-600">Total</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg font-bold text-blue-500">$</span>
                    </div>
                    <p className="text-lg font-bold text-charcoal-900">
                      {event.revenue}
                    </p>
                    <p className="text-xs text-charcoal-600">Revenue</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-primary-100 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${(event.ticketsSold / event.totalTickets) * 100}%`
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/host/events/${event.id}`}
                    className="flex-1 bg-red-500 text-white rounded-xl py-3 px-4 flex items-center justify-center space-x-2 hover:bg-red-600 transition-all duration-300 group/btn"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={`/host/analytics/${event.id}`}
                    className="flex-1 bg-primary-100 text-charcoal-700 rounded-xl py-3 px-4 flex items-center justify-center space-x-2 hover:bg-primary-200 transition-all duration-300 group/btn"
                  >
                    <Users className="w-4 h-4" />
                    <span>Analytics</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* Static Info (Visible when not hovering) */}
              <div className="p-6 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-charcoal-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-red-500">
                    {event.revenue}
                  </span>
                  <span className="text-sm text-charcoal-500">
                    {event.ticketsSold}/{event.totalTickets} sold
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-charcoal-400" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
              No events yet
            </h3>
            <p className="text-charcoal-600 mb-6">
              Create your first event and start selling tickets!
            </p>
            <Link 
              to="/host/events/create" 
              className="btn-primary bg-red-500 inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default HostEvents