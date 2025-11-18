// src/pages/host/Dashboard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Users, DollarSign, TrendingUp, Plus, Scan } from 'lucide-react'

const HostDashboard = () => {
  const stats = [
    {
      icon: Calendar,
      label: 'Total Events',
      value: '8',
      change: '+2',
      trend: 'up'
    },
    {
      icon: Users,
      label: 'Total Attendees',
      value: '1,247',
      change: '+156',
      trend: 'up'
    },
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: '$12,580',
      change: '+$2,340',
      trend: 'up'
    },
    {
      icon: TrendingUp,
      label: 'Conversion Rate',
      value: '24%',
      change: '+3%',
      trend: 'up'
    }
  ]

  const recentEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: '2024-07-15',
      attendees: 850,
      revenue: '$8,500',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Tech Conference',
      date: '2024-08-20',
      attendees: 397,
      revenue: '$4,080',
      status: 'upcoming'
    }
  ]

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
              Host Dashboard
            </h1>
            <p className="text-xl text-charcoal-600">
              Manage your events and track performance
            </p>
          </div>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <Link
              to="/host/scanner"
              className="btn-secondary flex items-center space-x-2"
            >
              <Scan className="w-4 h-4" />
              <span>QR Scanner</span>
            </Link>
            <Link
              to="/create"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  stat.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-charcoal-900 mb-1">
                {stat.value}
              </p>
              <p className="text-charcoal-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <motion.div
            className="card p-6 lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-charcoal-900">
                Recent Events
              </h2>
              <Link
                to="/host/events"
                className="text-accent-500 hover:text-accent-600 font-medium"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-primary-100 rounded-xl"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal-900 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-charcoal-600">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-charcoal-600">{event.attendees} attendees</span>
                      <span className="font-semibold text-charcoal-900">{event.revenue}</span>
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      event.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </span>
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
                to="/create"
                className="flex items-center justify-between p-4 bg-primary-100 rounded-xl hover:bg-primary-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-accent-500" />

                  <span className="font-medium">Create Event</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                  <span className="text-white text-sm">→</span>
                </div>
              </Link>

              <Link
                to="/host/events"
                className="flex items-center justify-between p-4 bg-primary-100 rounded-xl hover:bg-primary-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-accent-500" />
                  <span className="font-medium">Manage Events</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                  <span className="text-white text-sm">→</span>
                </div>
              </Link>

              <Link
                to="/host/scanner"
                className="flex items-center justify-between p-4 bg-primary-100 rounded-xl hover:bg-primary-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Scan className="w-5 h-5 text-accent-500" />
                  <span className="font-medium">QR Scanner</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                  <span className="text-white text-sm">→</span>
                </div>
              </Link>

              <Link
                to="/host/payouts"
                className="flex items-center justify-between p-4 bg-primary-100 rounded-xl hover:bg-primary-200 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-accent-500" />
                  <span className="font-medium">Payouts</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center">
                  <span className="text-white text-sm">→</span>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HostDashboard