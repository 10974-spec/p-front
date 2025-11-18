// src/pages/TicketView.jsx
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Maximize2, Calendar, MapPin, Clock, User } from 'lucide-react'
import QRCode from 'qrcode.react'
import { format } from 'date-fns'

const TicketView = () => {
  const { bookingId } = useParams()
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Mock data - in real app, fetch from API
  const ticketData = {
    id: bookingId,
    event: {
      title: 'Summer Music Festival 2024',
      dateStart: '2024-07-15T18:00:00Z',
      venue: {
        name: 'Central Park',
        address: 'New York, NY'
      }
    },
    ticket: {
      token: 'PASA-2024-ABC123',
      tier: 'General Admission',
      buyer: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
  }

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download ticket')
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
            Your Ticket
          </h1>
          <p className="text-xl text-charcoal-600">
            Present this QR code at the event entrance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Ticket Card */}
          <motion.div
            className="ticket-card relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-accent-500 rounded-full -translate-x-10 -translate-y-10 opacity-20" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-500 rounded-full translate-x-16 translate-y-16 opacity-20" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-charcoal-900 mb-2">
                  {ticketData.event.title}
                </h2>
                <div className="bg-accent-500 text-white px-4 py-1 rounded-full inline-block">
                  {ticketData.ticket.tier}
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-accent-500" />
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {format(new Date(ticketData.event.dateStart), 'EEEE, MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {format(new Date(ticketData.event.dateStart), 'h:mm a')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent-500" />
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {ticketData.event.venue.name}
                    </p>
                    <p className="text-sm text-charcoal-600">
                      {ticketData.event.venue.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-accent-500" />
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {ticketData.ticket.buyer.name}
                    </p>
                    <p className="text-sm text-charcoal-600">
                      {ticketData.ticket.buyer.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ticket ID */}
              <div className="text-center mb-6">
                <p className="text-sm text-charcoal-600">Ticket ID</p>
                <p className="font-mono font-semibold text-charcoal-900">
                  {ticketData.ticket.token}
                </p>
              </div>
            </div>
          </motion.div>

          {/* QR Code */}
          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={`bg-white p-8 rounded-2xl shadow-floating relative ${
              isFullscreen ? 'fixed inset-0 z-50 flex items-center justify-center' : ''
            }`}>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-accent-600/20 rounded-2xl blur-xl -z-10" />
              
              <QRCode
                value={ticketData.ticket.token}
                size={isFullscreen ? 300 : 200}
                level="H"
                includeMargin
                className="animate-glow"
              />
              
              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleDownload}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Fullscreen</span>
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-center mt-6 text-charcoal-600">
              <p>Present this QR code at the event entrance for scanning</p>
              <p className="text-sm mt-2">Make sure your screen brightness is turned up</p>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          className="card p-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
            Entry Instructions
          </h3>
          <ul className="space-y-2 text-charcoal-700">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full" />
              <span>Arrive at least 30 minutes before the event start time</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full" />
              <span>Have your QR code ready on your phone screen</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full" />
              <span>Ensure your phone brightness is at maximum</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent-500 rounded-full" />
              <span>This ticket is valid for one entry only</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <motion.div
          className="fixed inset-0 bg-black z-40 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleFullscreen}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* QR code is already rendered in the main component */}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default TicketView