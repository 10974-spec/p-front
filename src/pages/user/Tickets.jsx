// src/pages/user/Tickets.jsx
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Download, Eye, Ticket, QrCode, Users, Clock, ArrowRight, ChevronRight, CheckCircle, MoreVertical, Share2, Printer, Smartphone } from 'lucide-react'
import { format, parseISO } from 'date-fns'

const Tickets = () => {
  const tickets = [
    {
      id: 1,
      event: {
        title: 'Summer Music Festival 2024',
        date: '2024-07-15T18:00:00Z',
        venue: 'Central Park, Nairobi',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop',
        category: 'Music'
      },
      ticket: {
        type: 'General Admission',
        quantity: 2,
        purchaseDate: '2024-06-01T10:00:00Z',
        price: 45.00,
        section: 'Section A',
        row: '12',
        seat: '45-46'
      },
      status: 'active',
      qrCode: 'QR_CODE_DATA_1'
    },
    {
      id: 2,
      event: {
        title: 'Tech Innovation Conference',
        date: '2024-08-20T09:00:00Z',
        venue: 'Convention Center, Mombasa',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c7dfce?w=400&h=300&fit=crop',
        category: 'Technology'
      },
      ticket: {
        type: 'VIP Pass',
        quantity: 1,
        purchaseDate: '2024-07-15T14:30:00Z',
        price: 199.99,
        section: 'VIP Lounge',
        row: 'VIP',
        seat: 'VIP-12'
      },
      status: 'active',
      qrCode: 'QR_CODE_DATA_2'
    },
    {
      id: 3,
      event: {
        title: 'Food & Wine Expo 2024',
        date: '2024-09-10T16:00:00Z',
        venue: 'Exhibition Hall, Kisumu',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        category: 'Food'
      },
      ticket: {
        type: 'Premium Tasting',
        quantity: 3,
        purchaseDate: '2024-08-05T11:20:00Z',
        price: 89.99,
        section: 'Tasting Area',
        row: 'T-3',
        seat: 'T-15-17'
      },
      status: 'upcoming',
      qrCode: 'QR_CODE_DATA_3'
    }
  ]

  const upcomingEvents = tickets.filter(t => t.status === 'upcoming')
  const pastTickets = []

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-gradient-to-r from-red-500 to-red-600'
      case 'upcoming': return 'bg-gradient-to-r from-blue-500 to-blue-600'
      case 'used': return 'bg-gradient-to-r from-green-500 to-green-600'
      case 'cancelled': return 'bg-gradient-to-r from-gray-500 to-gray-600'
      default: return 'bg-gradient-to-r from-red-500 to-red-600'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Ready to Use'
      case 'upcoming': return 'Upcoming'
      case 'used': return 'Used'
      case 'cancelled': return 'Cancelled'
      default: return 'Active'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 pt-40 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl shadow-red-500/30 mb-6">
            <Ticket className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mb-4">
            My Tickets
          </h1>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            All your event tickets, organized and ready for your next adventure
          </p>
          
          {/* Stats Cards */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-red-100 min-w-[140px]">
              <div className="text-2xl font-bold text-red-500 mb-1">{tickets.length}</div>
              <div className="text-sm text-charcoal-500">Total Tickets</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-red-100 min-w-[140px]">
              <div className="text-2xl font-bold text-red-500 mb-1">{upcomingEvents.length}</div>
              <div className="text-sm text-charcoal-500">Upcoming Events</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-red-100 min-w-[140px]">
              <div className="text-2xl font-bold text-red-500 mb-1">{pastTickets.length}</div>
              <div className="text-sm text-charcoal-500">Past Events</div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Upcoming Tickets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-charcoal-900">Upcoming Events</h2>
                <p className="text-charcoal-500">Tickets for your next adventures</p>
              </div>
              {tickets.length > 0 && (
                <Link 
                  to="/events" 
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold"
                >
                  Explore More Events
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            <AnimatePresence>
              {tickets.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      className="group bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100 hover:shadow-red-500/20 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      {/* Ticket Header with Gradient */}
                      <div className={`relative h-2 ${getStatusColor(ticket.status)}`}>
                        <div className="absolute -bottom-1 left-6 w-3 h-3 bg-white rounded-full"></div>
                        <div className="absolute -bottom-1 right-6 w-3 h-3 bg-white rounded-full"></div>
                      </div>

                      <div className="p-6">
                        {/* Event Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <span className="inline-block px-3 py-1 bg-red-50 text-red-500 text-xs font-semibold rounded-full mb-2">
                              {ticket.event.category}
                            </span>
                            <h3 className="text-xl font-bold text-charcoal-900 leading-tight">
                              {ticket.event.title}
                            </h3>
                          </div>
                          <span className={`px-3 py-1 ${getStatusColor(ticket.status)} text-white text-xs font-semibold rounded-full`}>
                            {getStatusText(ticket.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left Column - Event Details */}
                          <div className="space-y-4">
                            {/* Event Image */}
                            <div className="relative rounded-xl overflow-hidden">
                              <img
                                src={ticket.event.image}
                                alt={ticket.event.title}
                                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>

                            {/* Event Info */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-50 rounded-lg">
                                  <Calendar className="w-4 h-4 text-red-500" />
                                </div>
                                <div>
                                  <div className="text-xs text-charcoal-500">Date & Time</div>
                                  <div className="font-medium text-charcoal-900">
                                    {format(parseISO(ticket.event.date), 'EEEE, MMM dd • h:mm a')}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-50 rounded-lg">
                                  <MapPin className="w-4 h-4 text-red-500" />
                                </div>
                                <div>
                                  <div className="text-xs text-charcoal-500">Venue</div>
                                  <div className="font-medium text-charcoal-900">
                                    {ticket.event.venue}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right Column - Ticket Details */}
                          <div className="space-y-4">
                            {/* QR Code Placeholder */}
                            <div className="bg-gradient-to-br from-red-50 to-white p-4 rounded-xl border border-red-100 text-center">
                              <div className="inline-block p-3 bg-white rounded-lg shadow-inner mb-3">
                                <QrCode className="w-12 h-12 text-red-500" />
                              </div>
                              <div className="text-xs text-charcoal-500 mb-1">Scan at entry</div>
                              <div className="text-sm font-mono font-semibold text-red-500">
                                PASA-{ticket.id.toString().padStart(8, '0')}
                              </div>
                            </div>

                            {/* Ticket Details */}
                            <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-4 border border-red-100">
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <div className="text-xs text-charcoal-500">Type</div>
                                  <div className="font-semibold text-charcoal-900">{ticket.ticket.type}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-charcoal-500">Quantity</div>
                                  <div className="font-semibold text-charcoal-900">
                                    <Users className="inline w-3 h-3 mr-1" />
                                    {ticket.ticket.quantity}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-charcoal-500">Section</div>
                                  <div className="font-semibold text-charcoal-900">{ticket.ticket.section}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-charcoal-500">Seat</div>
                                  <div className="font-semibold text-charcoal-900">{ticket.ticket.seat}</div>
                                </div>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between bg-gradient-to-r from-red-50 to-white p-4 rounded-xl border border-red-100">
                              <div>
                                <div className="text-xs text-charcoal-500">Total Paid</div>
                                <div className="text-xl font-bold text-red-500">
                                  ${(ticket.ticket.price * ticket.ticket.quantity).toFixed(2)}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-charcoal-500">Price per ticket</div>
                                <div className="font-semibold text-charcoal-900">
                                  ${ticket.ticket.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-red-100">
                          <Link
                            to={`/ticket/${ticket.id}`}
                            className="flex-1 min-w-[140px] px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Ticket
                          </Link>
                          <button className="flex-1 min-w-[140px] px-6 py-3 bg-white border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button className="flex-1 min-w-[140px] px-6 py-3 bg-white border-2 border-red-200 text-charcoal-700 font-semibold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            Save to Phone
                          </button>
                          <button className="px-4 py-3 bg-white border-2 border-red-200 text-charcoal-700 rounded-xl hover:bg-red-50 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Ticket Footer */}
                      <div className="px-6 py-4 bg-gradient-to-r from-red-50 to-white border-t border-red-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-charcoal-600">Ticket purchased on</span>
                          <span className="font-semibold text-charcoal-900">
                            {format(parseISO(ticket.ticket.purchaseDate), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-semibold">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="text-center py-16 bg-white rounded-3xl shadow-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Ticket className="w-12 h-12 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal-900 mb-3">
                    No tickets yet
                  </h3>
                  <p className="text-charcoal-600 mb-8 max-w-md mx-auto">
                    Start your journey by exploring amazing events and securing your spot!
                  </p>
                  <Link 
                    to="/events" 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-xl shadow-red-500/30"
                  >
                    <span>Browse Events</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Past Tickets Section */}
          {pastTickets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-charcoal-900">Past Events</h2>
                <p className="text-charcoal-500">Relive your past experiences</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastTickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-red-100"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded">
                          Past Event
                        </span>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                      <h4 className="font-semibold text-charcoal-900 mb-2 line-clamp-2">
                        {ticket.event.title}
                      </h4>
                      <div className="flex items-center text-sm text-charcoal-500 mb-4">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(parseISO(ticket.event.date), 'MMM dd, yyyy')}
                      </div>
                      <button className="w-full px-4 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors text-sm font-semibold">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Help Section */}
          <motion.div
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-8 text-white mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Digital Tickets</h3>
                <p className="text-sm text-red-100 opacity-90">
                  Scan QR code at venue entry
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Easy Download</h3>
                <p className="text-sm text-red-100 opacity-90">
                  Save tickets to your phone
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Printer className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Print Option</h3>
                <p className="text-sm text-red-100 opacity-90">
                  Print tickets if needed
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Tickets