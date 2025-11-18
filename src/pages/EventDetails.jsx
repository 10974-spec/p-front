// src/pages/EventDetails.jsx
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEventBySlug } from '../store/slices/eventsSlice'
import { MapPin, Calendar, Clock, Users, Share2, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import TicketPurchaseCard from '../components/Event/TicketPurchaseCard'

const EventDetails = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { currentEvent: event, loading } = useSelector((state) => state.events)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)

  useEffect(() => {
    if (slug) {
      dispatch(fetchEventBySlug(slug))
    }
  }, [dispatch, slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-96 bg-primary-200 rounded-2xl mb-8" />
            <div className="h-8 bg-primary-200 rounded mb-4 w-3/4" />
            <div className="h-4 bg-primary-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-charcoal-900 mb-2">
            Event not found
          </h2>
          <p className="text-charcoal-600">
            The event you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  const allImages = [event.mainImage, ...(event.gallery || [])].filter(Boolean)
  const displayImages = allImages.slice(0, 4)

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Image */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={event.mainImage || '/api/placeholder/1200/600'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Back Button */}
        <motion.button
          className="absolute top-6 left-6 glass p-3 rounded-xl text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <motion.button
            className="glass p-3 rounded-xl text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="glass p-3 rounded-xl text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Header */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal-900 mb-2">
                    {event.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-charcoal-600">
                    <span className="bg-primary-200 px-3 py-1 rounded-full text-sm">
                      {event.category}
                    </span>
                    <span>Hosted by {event.hostId?.businessName}</span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-accent-500" />
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {format(new Date(event.dateStart), 'MMM dd, yyyy')}
                    </p>
                    <p className="text-sm text-charcoal-600">
                      {format(new Date(event.dateStart), 'EEEE')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {format(new Date(event.dateStart), 'h:mm a')}
                    </p>
                    <p className="text-sm text-charcoal-600">Duration: 3h</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent-500" />
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {event.venue?.name}
                    </p>
                    <p className="text-sm text-charcoal-600">
                      {event.venue?.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Attendance */}
              {event.ticketTiers && (
                <div className="flex items-center space-x-2 text-charcoal-600">
                  <Users className="w-4 h-4" />
                  <span>
                    {event.ticketTiers.reduce((sum, tier) => sum + (tier.totalQty - tier.remainingQty), 0)} people going
                  </span>
                </div>
              )}
            </motion.div>

            {/* Image Gallery */}
            {displayImages.length > 0 && (
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                  Gallery
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {displayImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer ${
                        index === 0 ? 'col-span-2' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        setSelectedImageIndex(index)
                        setShowImageModal(true)
                      }}
                    >
                      <img
                        src={image}
                        alt={`${event.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 3 && allImages.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">
                            +{allImages.length - 4} more
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                About this event
              </h3>
              <div className="prose prose-charcoal max-w-none">
                <p className="text-charcoal-700 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </motion.div>

            {/* What to Expect */}
            <motion.div
              className="card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                What to expect
              </h3>
              <ul className="space-y-2 text-charcoal-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full" />
                  <span>Digital tickets with QR codes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full" />
                  <span>Fast entry with QR scanning</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full" />
                  <span>Mobile-friendly experience</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-500 rounded-full" />
                  <span>Instant confirmation</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Ticket Purchase Card - Sticky */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <TicketPurchaseCard event={event} />
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[selectedImageIndex]}
                alt={`${event.title} ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
              
              {/* Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 glass p-3 rounded-xl text-white"
                    onClick={() => setSelectedImageIndex((prev) => 
                      prev === 0 ? allImages.length - 1 : prev - 1
                    )}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 glass p-3 rounded-xl text-white"
                    onClick={() => setSelectedImageIndex((prev) => 
                      prev === allImages.length - 1 ? 0 : prev + 1
                    )}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 glass p-3 rounded-xl text-white"
                onClick={() => setShowImageModal(false)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass px-4 py-2 rounded-full text-white">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EventDetails