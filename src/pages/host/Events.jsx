// src/pages/host/Events.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus, Users, Calendar, MapPin, Edit, Trash2 } from 'lucide-react'
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
      revenue: '$8,500'
    },
    {
      id: 2,
      title: 'Tech Innovation Conference',
      date: '2024-08-20T09:00:00Z',
      venue: 'Convention Center',
      status: 'published',
      ticketsSold: 397,
      totalTickets: 500,
      revenue: '$4,080'
    },
    {
      id: 3,
      title: 'Art Exhibition Opening',
      date: '2024-09-05T17:00:00Z',
      venue: 'Modern Art Museum',
      status: 'draft',
      ticketsSold: 0,
      totalTickets: 200,
      revenue: '$0'
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
    <div className="min-h-screen bg-primary-50 py-8">
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
            to="/host/events/create"
            className="btn-primary flex items-center space-x-2 mt-4 lg:mt-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
          </Link>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Event Image */}
              <div className="h-48 bg-gradient-to-br from-accent-500 to-accent-600 relative">
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {getStatusText(event.status)}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>

                {/* Event Details */}
                <div className="space-y-2 text-sm text-charcoal-600 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(event.date), 'MMM dd, yyyy • h:mm a')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-charcoal-900">
                      {event.ticketsSold}
                    </p>
                    <p className="text-xs text-charcoal-600">Sold</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-charcoal-900">
                      {event.totalTickets}
                    </p>
                    <p className="text-xs text-charcoal-600">Total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-charcoal-900">
                      {event.revenue}
                    </p>
                    <p className="text-xs text-charcoal-600">Revenue</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-primary-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-accent-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${(event.ticketsSold / event.totalTickets) * 100}%`
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Link
                    to={`/host/events/${event.id}`}
                    className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <Link
                    to={`/host/analytics/${event.id}`}
                    className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Analytics</span>
                  </Link>
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
            <Link to="/host/events/create" className="btn-primary">
              Create Event
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default HostEvents