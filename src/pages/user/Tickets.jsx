// src/pages/user/Tickets.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Download, Eye, Ticket, QrCode, Users, Clock, ArrowRight, ChevronRight, CheckCircle, MoreVertical, Share2, Printer, Smartphone, X, Mail, Phone, User, DollarSign, Map } from 'lucide-react'
import { format, parseISO } from 'date-fns'

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tickets = [
    {
      id: 1,
      event: {
        title: 'Summer Music Festival 2024',
        date: '2024-07-15T18:00:00Z',
        venue: 'Central Park, Nairobi',
        location: 'Nairobi, Kenya',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop',
        category: 'Music',
        description: 'A spectacular music festival featuring top artists from around the world.',
        organizer: 'Music Events Ltd',
        capacity: '5000',
        dressCode: 'Casual'
      },
      ticket: {
        type: 'General Admission',
        quantity: 2,
        purchaseDate: '2024-06-01T10:00:00Z',
        price: 45.00,
        section: 'Section A',
        row: '12',
        seat: '45-46',
        ticketNumber: 'PASA-20240715-001'
      },
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+254 712 345 678'
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
        location: 'Mombasa, Kenya',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c7dfce?w=800&h=600&fit=crop',
        category: 'Technology',
        description: 'Annual tech conference featuring industry leaders and innovation showcases.',
        organizer: 'Tech Summit Org',
        capacity: '2000',
        dressCode: 'Business Casual'
      },
      ticket: {
        type: 'VIP Pass',
        quantity: 1,
        purchaseDate: '2024-07-15T14:30:00Z',
        price: 199.99,
        section: 'VIP Lounge',
        row: 'VIP',
        seat: 'VIP-12',
        ticketNumber: 'PASA-20240820-002'
      },
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+254 712 345 678'
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
        location: 'Kisumu, Kenya',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        category: 'Food',
        description: 'Experience the finest cuisine and wines from around the world.',
        organizer: 'Gourmet Events',
        capacity: '1500',
        dressCode: 'Smart Casual'
      },
      ticket: {
        type: 'Premium Tasting',
        quantity: 3,
        purchaseDate: '2024-08-05T11:20:00Z',
        price: 89.99,
        section: 'Tasting Area',
        row: 'T-3',
        seat: 'T-15-17',
        ticketNumber: 'PASA-20240910-003'
      },
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+254 712 345 678'
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

  const openTicketModal = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedTicket(null), 300)
  }

  const handleDownloadTicket = (ticket) => {
    console.log('Downloading ticket:', ticket)
    // Implement download logic here
  }

  const handleShareTicket = (ticket) => {
    console.log('Sharing ticket:', ticket)
    // Implement share logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 pt-40 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-charcoal-900">My Tickets</h2>
                <p className="text-charcoal-500">All your upcoming and active tickets</p>
              </div>
              {tickets.length > 0 && (
                <Link 
                  to="/events" 
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30"
                >
                  Explore More Events
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>

            <AnimatePresence>
              {tickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tickets.map((ticket, index) => (
                    <motion.div
                      key={ticket.id}
                      className="group bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100 hover:shadow-red-500/30 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -6 }}
                    >
                      {/* Event Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={ticket.event.image}
                          alt={ticket.event.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Category Badge */}
                        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-red-500 text-xs font-bold rounded-full">
                          {ticket.event.category}
                        </span>
                        
                        {/* Status Badge */}
                        <span className={`absolute top-4 right-4 px-3 py-1 ${getStatusColor(ticket.status)} text-white text-xs font-bold rounded-full`}>
                          {getStatusText(ticket.status)}
                        </span>
                        
                        {/* Overlay Content */}
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="text-xl font-bold mb-1 line-clamp-1">{ticket.event.title}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-3 h-3" />
                            <span>{format(parseISO(ticket.event.date), 'MMM dd, yyyy')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Details */}
                      <div className="p-6">
                        {/* Venue & Location */}
                        <div className="flex items-center gap-2 text-charcoal-600 mb-4">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm line-clamp-1">{ticket.event.venue}</span>
                        </div>

                        {/* Ticket Info Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-red-50 rounded-xl p-3">
                            <div className="text-xs text-charcoal-500 mb-1">Ticket Type</div>
                            <div className="font-semibold text-charcoal-900">{ticket.ticket.type}</div>
                          </div>
                          <div className="bg-red-50 rounded-xl p-3">
                            <div className="text-xs text-charcoal-500 mb-1">Quantity</div>
                            <div className="font-semibold text-charcoal-900 flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {ticket.ticket.quantity}
                            </div>
                          </div>
                          <div className="bg-red-50 rounded-xl p-3">
                            <div className="text-xs text-charcoal-500 mb-1">Seat</div>
                            <div className="font-semibold text-charcoal-900">{ticket.ticket.seat}</div>
                          </div>
                          <div className="bg-red-50 rounded-xl p-3">
                            <div className="text-xs text-charcoal-500 mb-1">Total</div>
                            <div className="font-semibold text-red-500">${(ticket.ticket.price * ticket.ticket.quantity).toFixed(2)}</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => openTicketModal(ticket)}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleDownloadTicket(ticket)}
                            className="px-6 py-3 bg-white border-2 border-red-500 text-red-500 font-semibold rounded-full hover:bg-red-50 transition-all shadow-md flex items-center justify-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-6 py-3 bg-gradient-to-r from-red-50 to-white border-t border-red-100">
                        <div className="flex items-center justify-between text-xs text-charcoal-500">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            Purchased {format(parseISO(ticket.ticket.purchaseDate), 'MMM dd')}
                          </div>
                          <span className="font-mono font-semibold">#{ticket.ticket.ticketNumber}</span>
                        </div>
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

      {/* Ticket Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTicket && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            
            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-red-100 p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-500 rounded-full">
                      <Ticket className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-charcoal-900">Ticket Details</h2>
                      <p className="text-sm text-charcoal-500">{selectedTicket.event.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-charcoal-500" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                  <div className="p-6">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Left Column - Event & Ticket Info */}
                      <div className="space-y-6">
                        {/* Event Image */}
                        <div className="relative rounded-2xl overflow-hidden">
                          <img
                            src={selectedTicket.event.image}
                            alt={selectedTicket.event.title}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="text-2xl font-bold mb-1">{selectedTicket.event.title}</h3>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{format(parseISO(selectedTicket.event.date), 'EEEE, MMMM dd, yyyy • h:mm a')}</span>
                            </div>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-100">
                          <h4 className="text-lg font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                            <Map className="w-5 h-5 text-red-500" />
                            Event Information
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 text-red-500 mt-0.5" />
                              <div>
                                <div className="text-sm text-charcoal-500">Venue</div>
                                <div className="font-medium text-charcoal-900">{selectedTicket.event.venue}</div>
                                <div className="text-sm text-charcoal-500">{selectedTicket.event.location}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <User className="w-5 h-5 text-red-500 mt-0.5" />
                              <div>
                                <div className="text-sm text-charcoal-500">Organizer</div>
                                <div className="font-medium text-charcoal-900">{selectedTicket.event.organizer}</div>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Users className="w-5 h-5 text-red-500 mt-0.5" />
                              <div>
                                <div className="text-sm text-charcoal-500">Capacity</div>
                                <div className="font-medium text-charcoal-900">{selectedTicket.event.capacity} people</div>
                              </div>
                            </div>
                            <div className="text-sm text-charcoal-600">
                              <span className="font-medium">Dress Code:</span> {selectedTicket.event.dressCode}
                            </div>
                          </div>
                        </div>

                        {/* User Information */}
                        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-100">
                          <h4 className="text-lg font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-red-500" />
                            Ticket Holder
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <User className="w-5 h-5 text-red-500" />
                              <div className="font-medium text-charcoal-900">{selectedTicket.user.name}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-red-500" />
                              <div className="font-medium text-charcoal-900">{selectedTicket.user.email}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-red-500" />
                              <div className="font-medium text-charcoal-900">{selectedTicket.user.phone}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Ticket & Actions */}
                      <div className="space-y-6">
                        {/* Ticket Details Card */}
                        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-100">
                          <h4 className="text-lg font-bold text-charcoal-900 mb-4 flex items-center gap-2">
                            <Ticket className="w-5 h-5 text-red-500" />
                            Ticket Details
                          </h4>
                          
                          {/* Ticket Number */}
                          <div className="mb-6 p-4 bg-white rounded-xl border border-red-200">
                            <div className="text-sm text-charcoal-500 mb-1">Ticket Number</div>
                            <div className="text-xl font-mono font-bold text-red-500">{selectedTicket.ticket.ticketNumber}</div>
                          </div>

                          {/* Ticket Info Grid */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white rounded-xl p-4 border border-red-200">
                              <div className="text-xs text-charcoal-500 mb-1">Ticket Type</div>
                              <div className="font-semibold text-charcoal-900">{selectedTicket.ticket.type}</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-red-200">
                              <div className="text-xs text-charcoal-500 mb-1">Quantity</div>
                              <div className="font-semibold text-charcoal-900 flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {selectedTicket.ticket.quantity}
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-red-200">
                              <div className="text-xs text-charcoal-500 mb-1">Section</div>
                              <div className="font-semibold text-charcoal-900">{selectedTicket.ticket.section}</div>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-red-200">
                              <div className="text-xs text-charcoal-500 mb-1">Seat</div>
                              <div className="font-semibold text-charcoal-900">{selectedTicket.ticket.seat}</div>
                            </div>
                          </div>

                          {/* Price Summary */}
                          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm">Price per ticket</div>
                              <div className="font-semibold">${selectedTicket.ticket.price.toFixed(2)}</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold">Total Amount</div>
                              <div className="text-2xl font-bold">${(selectedTicket.ticket.price * selectedTicket.ticket.quantity).toFixed(2)}</div>
                            </div>
                          </div>
                        </div>

                        {/* QR Code */}
                        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-6 border border-red-100 text-center">
                          <h4 className="text-lg font-bold text-charcoal-900 mb-4">Digital Ticket</h4>
                          <div className="inline-block p-4 bg-white rounded-2xl shadow-inner">
                            <QrCode className="w-40 h-40 text-red-500" />
                          </div>
                          <div className="mt-4 text-sm text-charcoal-500">
                            Scan this QR code at the venue entrance
                          </div>
                          <div className="mt-2 font-mono text-sm font-semibold text-red-500">
                            {selectedTicket.ticket.ticketNumber}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <button
                            onClick={() => handleDownloadTicket(selectedTicket)}
                            className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-full hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-3"
                          >
                            <Download className="w-5 h-5" />
                            Download Ticket
                          </button>
                          <button
                            onClick={() => handleShareTicket(selectedTicket)}
                            className="w-full px-6 py-4 bg-white border-2 border-red-500 text-red-500 font-bold rounded-full hover:bg-red-50 transition-all flex items-center justify-center gap-3"
                          >
                            <Share2 className="w-5 h-5" />
                            Share Ticket
                          </button>
                          <button className="w-full px-6 py-4 bg-white border-2 border-red-200 text-charcoal-700 font-semibold rounded-full hover:bg-red-50 transition-all flex items-center justify-center gap-3">
                            <Smartphone className="w-5 h-5" />
                            Save to Mobile Wallet
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white border-t border-red-100 p-4">
                  <div className="flex items-center justify-between text-sm text-charcoal-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Purchased on {format(parseISO(selectedTicket.ticket.purchaseDate), 'MMMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 ${getStatusColor(selectedTicket.status)} text-white text-xs font-semibold rounded-full`}>
                        {getStatusText(selectedTicket.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Tickets