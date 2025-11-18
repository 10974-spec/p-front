// src/pages/user/Dashboard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Ticket, Calendar, Star, User } from 'lucide-react'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)

  const stats = [
    {
      icon: Ticket,
      label: 'Total Tickets',
      value: '12',
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      label: 'Upcoming Events',
      value: '3',
      color: 'bg-green-500'
    },
    {
      icon: Star,
      label: 'Events Attended',
      value: '9',
      color: 'bg-purple-500'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: '2024-07-15',
      venue: 'Central Park',
      tickets: 2
    },
    {
      id: 2,
      title: 'Tech Conference',
      date: '2024-08-20',
      venue: 'Convention Center',
      tickets: 1
    }
  ]

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Welcome Section */}
        <motion.div
          className="card p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-charcoal-600">
                Here's what's happening with your events and tickets.
              </p>
            </div>
            <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-accent-500" />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-charcoal-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-charcoal-600 text-sm">{stat.label}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Events */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-charcoal-900">
                Upcoming Events
              </h2>
              <Link
                to="/dashboard/tickets"
                className="text-accent-500 hover:text-accent-600 font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-primary-100 rounded-xl"
                >
                  <div>
                    <h3 className="font-semibold text-charcoal-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-charcoal-600">
                      {new Date(event.date).toLocaleDateString()} • {event.venue}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-charcoal-900">
                      {event.tickets} {event.tickets === 1 ? 'ticket' : 'tickets'}
                    </p>
                    <Link
                      to={`/ticket/${event.id}`}
                      className="text-sm text-accent-500 hover:text-accent-600"
                    >
                      View Ticket
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-charcoal-900 mb-6">
              Quick Actions
            </h2>
            
            <div className="space-y-4">
              <Link
                to="/events"
                className="flex items-center justify-between p-4 bg-primary-100 rounded-xl hover:bg-primary-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-accent-500" />
                  <span className="font-medium">Browse Events</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                  <span className="text-white text-sm">→</span>
                </div>
              </Link>

              <Link
                to="/dashboard/tickets"
                className="flex items-center justify-between p-4 bg-primary-100 rounded-xl hover:bg-primary-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Ticket className="w-5 h-5 text-accent-500" />
                  <span className="font-medium">My Tickets</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                  <span className="text-white text-sm">→</span>
                </div>
              </Link>

              {user?.role === 'host' && (
                <Link
                  to="/host"
                  className="flex items-center justify-between p-4 bg-primary-100 rounded-xl hover:bg-primary-200 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-accent-500" />
                    <span className="font-medium">Host Dashboard</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard