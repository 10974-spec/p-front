// src/pages/host/Dashboard.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  Scan, 
  BarChart3,
  PieChart,
  Settings,
  Ticket,
  Home,
  ArrowRight,
  ChevronRight,
  MapPin,
  Edit,
  Menu,
  X
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { format } from 'date-fns'

const HostDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'attendees', label: 'Attendees', icon: Users },
    { id: 'scanner', label: 'QR Scanner', icon: Scan },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

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
    },
    {
      id: 3,
      title: 'Art Exhibition',
      date: '2024-09-10',
      attendees: 0,
      revenue: '$0',
      status: 'draft'
    }
  ]

  // Chart Data
  const revenueData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1900 },
    { month: 'Mar', revenue: 1500 },
    { month: 'Apr', revenue: 2200 },
    { month: 'May', revenue: 2800 },
    { month: 'Jun', revenue: 3200 },
    { month: 'Jul', revenue: 4100 },
  ]

  const attendanceData = [
    { name: 'Music', value: 35 },
    { name: 'Business', value: 25 },
    { name: 'Arts', value: 20 },
    { name: 'Food & Drink', value: 15 },
    { name: 'Sports', value: 5 },
  ]

  const ticketSalesData = [
    { day: 'Mon', sales: 45 },
    { day: 'Tue', sales: 52 },
    { day: 'Wed', sales: 38 },
    { day: 'Thu', sales: 61 },
    { day: 'Fri', sales: 75 },
    { day: 'Sat', sales: 89 },
    { day: 'Sun', sales: 67 },
  ]

  const COLORS = ['#EF4444', '#F97316', '#F59E0B', '#10B981', '#3B82F6']

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

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-red-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#EF4444" 
                      strokeWidth={3}
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Attendance Pie Chart */}
              <motion.div
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Recent Events */}
            <motion.div
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Events</h3>
                <button
                  onClick={() => setActiveSection('events')}
                  className="text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-red-200 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">{event.attendees} attendees</span>
                        <span className="font-semibold text-gray-900">{event.revenue}</span>
                      </div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'completed' 
                          ? 'bg-red-100 text-red-800'
                          : event.status === 'upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )

      case 'events':
        return (
          <div className="space-y-8">
            {/* Events Header */}
            <motion.div
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  My Events
                </h2>
                <p className="text-gray-600">
                  Create and manage your events
                </p>
              </div>
              <Link
                to="/create"
                className="bg-red-500 text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-red-600 transition-colors mt-4 lg:mt-0"
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
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)} backdrop-blur-sm`}>
                        {getStatusText(event.status)}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.venue}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${(event.ticketsSold / event.totalTickets) * 100}%`
                        }}
                      />
                    </div>

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-red-500">
                          {event.revenue}
                        </p>
                        <p className="text-xs text-gray-500">
                          {event.ticketsSold}/{event.totalTickets} sold
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link
                          to={`/host/events/${event.id}`}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/host/analytics/${event.id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </Link>
                      </div>
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
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No events yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first event and start selling tickets!
                </p>
                <Link 
                  to="/create" 
                  className="bg-red-500 text-white px-6 py-3 rounded-xl inline-flex items-center space-x-2 hover:bg-red-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Event</span>
                </Link>
              </motion.div>
            )}
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Sales Performance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={ticketSalesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )

      case 'revenue':
        return (
          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RechartsPieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: $${value}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )

      default:
        return (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h3>
            <p className="text-gray-600">Content for {activeSection} section coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Floating Sidebar Toggle Button */}
      <motion.button
        className="fixed top-6 left-6 z-50 w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:bg-red-600 transition-all duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Compact Sidebar */}
      <motion.div
        className={`fixed top-20 left-6 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        }`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Logo - Only show when expanded */}
        {isSidebarOpen && (
          <motion.div
            className="p-4 border-b border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/src/assets/logo2.png" 
                alt="PASA Logo" 
                className="size-10" 
              />
              <span className="font-bold text-gray-900 text-lg">PASA</span>
            </Link>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                onClick={() => {
                  setActiveSection(item.id)
                  setIsSidebarOpen(false)
                }}
                onMouseEnter={() => !isSidebarOpen && setHoveredItem(item.id)}
                onMouseLeave={() => !isSidebarOpen && setHoveredItem(null)}
                className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                  activeSection === item.id
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${isSidebarOpen ? 'justify-start space-x-3' : 'justify-center'}`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && (
                  <motion.span
                    className="font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
              
              {/* Active indicator for compact mode */}
              {!isSidebarOpen && activeSection === item.id && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          ))}
        </nav>

        {/* Quick Actions - Only show when expanded */}
        {isSidebarOpen && (
          <motion.div
            className="p-3 border-t border-gray-200 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/create"
              className="w-full bg-red-500 text-white rounded-xl p-3 flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors mb-2"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Create Event</span>
            </Link>
            <Link
              to="/host/scanner"
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-xl p-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
            >
              <Scan className="w-4 h-4" />
              <span className="font-medium">QR Scanner</span>
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* External Tooltips - Render outside the sidebar */}
      {!isSidebarOpen && menuItems.map((item) => (
        <motion.div
          key={item.id}
          className={`fixed left-24 z-50 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow-lg pointer-events-none transition-all duration-200 ${
            hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            top: `calc(5rem + ${menuItems.findIndex(i => i.id === item.id) * 3.5}rem)`,
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ 
            opacity: hoveredItem === item.id ? 1 : 0,
            x: hoveredItem === item.id ? 0 : -10
          }}
        >
          {item.label}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-red-500"></div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarOpen ? 'ml-80' : 'ml-24'
      }`}>
        <div className="p-8">
          {/* Header */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-red-500 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-400 rounded-full opacity-20"></div>
              
              <div className="relative z-10">
                <h1 className="text-3xl font-display font-bold mb-2">
                  {menuItems.find(item => item.id === activeSection)?.label}
                </h1>
                <p className="text-red-100">
                  {activeSection === 'overview' 
                    ? 'Manage your events and track performance' 
                    : activeSection === 'events'
                    ? 'Create and manage your events'
                    : `Manage ${activeSection.toLowerCase()} and view insights`}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSectionContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default HostDashboard