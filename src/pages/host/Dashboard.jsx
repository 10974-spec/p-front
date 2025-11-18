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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header - Outside the container */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-2">
            Host Dashboard
          </h1>
          <p className="text-xl text-charcoal-600">
            Manage your events and track performance
          </p>
        </motion.div>

        {/* Main Container */}
        <motion.div
          className="bg-green-300 rounded-3xl  p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              to="/host/scanner"
              className="btn-secondary flex items-center space-x-2 bg-white border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
            >
              <Scan className="w-4 h-4" />
              <span>QR Scanner</span>
            </Link>
            <Link
              to="/create"
              className="btn-primary flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white border-green-500"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow"
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
              className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm lg:col-span-2"
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
                  className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>

              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:border-green-200 transition-colors"
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
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'completed' 
                          ? 'bg-green-100 text-green-800 border border-green-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
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
              className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm"
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
                  className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 hover:border-green-200 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-charcoal-900">Create Event</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </Link>

                <Link
                  to="/host/events"
                  className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 hover:border-green-200 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-charcoal-900">Manage Events</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </Link>

                <Link
                  to="/host/scanner"
                  className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 hover:border-green-200 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                      <Scan className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-charcoal-900">QR Scanner</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </Link>

                <Link
                  to="/host/payouts"
                  className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100 hover:border-green-200 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-charcoal-900">Payouts</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HostDashboard