// src/components/Event/EventCard.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users } from 'lucide-react'
import { format } from 'date-fns'

const EventCard = ({ event, index }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy')
  }

  const formatTime = (dateString) => {
    return format(new Date(dateString), 'h:mm a')
  }

  const getLowestPrice = (ticketTiers) => {
    if (!ticketTiers?.length) return 0
    return Math.min(...ticketTiers.map(tier => tier.price))
  }

  return (
    <motion.div
      className="card overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Link to={`/event/${event.slug}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.mainImage || '/api/placeholder/400/300'}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          
          {/* Price Badge */}
          <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full">
            <span className="text-sm font-semibold text-charcoal-900">
              From ${getLowestPrice(event.ticketTiers) / 100}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-charcoal-900 mb-2 line-clamp-2 group-hover:text-accent-500 transition-colors">
            {event.title}
          </h3>
          
          <div className="space-y-2 text-sm text-charcoal-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event.dateStart)} • {formatTime(event.dateStart)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{event.venue?.name}</span>
            </div>
            
            {event.ticketTiers && (
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>
                  {event.ticketTiers.reduce((sum, tier) => sum + (tier.totalQty - tier.remainingQty), 0)} going
                </span>
              </div>
            )}
          </div>

          {/* Category Badge */}
          <div className="mt-3">
            <span className="inline-block px-2 py-1 bg-primary-200 text-charcoal-700 text-xs rounded-full">
              {event.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default EventCard