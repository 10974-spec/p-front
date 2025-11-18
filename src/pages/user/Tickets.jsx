// src/pages/user/Tickets.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Download, Eye } from 'lucide-react'
import { format } from 'date-fns'

const Tickets = () => {
  const tickets = [
    {
      id: 1,
      event: {
        title: 'Summer Music Festival 2024',
        date: '2024-07-15T18:00:00Z',
        venue: 'Central Park',
        image: '/api/placeholder/400/300'
      },
      ticket: {
        type: 'General Admission',
        quantity: 2,
        purchaseDate: '2024-06-01T10:00:00Z'
      },
      status: 'active'
    },
    {
      id: 2,
      event: {
        title: 'Tech Innovation Conference',
        date: '2024-08-20T09:00:00Z',
        venue: 'Convention Center',
        image: '/api/placeholder/400/300'
      },
      ticket: {
        type: 'VIP Pass',
        quantity: 1,
        purchaseDate: '2024-07-15T14:30:00Z'
      },
      status: 'active'
    }
  ]

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
            My Tickets
          </h1>
          <p className="text-xl text-charcoal-600">
            All your upcoming events and tickets in one place
          </p>
        </motion.div>

        {/* Tickets List */}
        <div className="space-y-6">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              className="card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Event Image */}
                  <div className="lg:w-48 lg:h-32">
                    <img
                      src={ticket.event.image}
                      alt={ticket.event.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                      {ticket.event.title}
                    </h3>
                    
                    <div className="space-y-2 text-charcoal-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(ticket.event.date), 'EEEE, MMMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{ticket.event.venue}</span>
                      </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-charcoal-500">Ticket Type:</span>
                        <span className="ml-2 font-medium text-charcoal-900">
                          {ticket.ticket.type}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-500">Quantity:</span>
                        <span className="ml-2 font-medium text-charcoal-900">
                          {ticket.ticket.quantity}
                        </span>
                      </div>
                      <div>
                        <span className="text-charcoal-500">Purchased:</span>
                        <span className="ml-2 font-medium text-charcoal-900">
                          {format(new Date(ticket.ticket.purchaseDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-3">
                    <Link
                      to={`/ticket/${ticket.id}`}
                      className="btn-primary flex items-center space-x-2 lg:w-full justify-center"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Ticket</span>
                    </Link>
                    <button className="btn-secondary flex items-center space-x-2 lg:w-full justify-center">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className={`px-6 py-3 ${
                ticket.status === 'active' 
                  ? 'bg-green-50 border-t border-green-200' 
                  : 'bg-gray-50 border-t border-gray-200'
              }`}>
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-medium ${
                    ticket.status === 'active' ? 'text-green-800' : 'text-gray-800'
                  }`}>
                    {ticket.status === 'active' ? 'Active' : 'Expired'}
                  </span>
                  <span className="text-charcoal-500">
                    Ticket ID: PASA-{ticket.id.toString().padStart(6, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {tickets.length === 0 && (
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
              No tickets yet
            </h3>
            <p className="text-charcoal-600 mb-6">
              Start exploring events and get your first tickets!
            </p>
            <Link to="/events" className="btn-primary">
              Browse Events
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Tickets