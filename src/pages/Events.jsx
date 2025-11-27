// src/pages/Events.jsx
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents, setFilters } from '../store/slices/eventsSlice'
import EventCard from '../components/Event/EventCard'
import { Filter, Grid, List, Search } from 'lucide-react'

const Events = () => {
  const dispatch = useDispatch()
  const { events, loading, filters } = useSelector((state) => state.events)
  const [viewMode, setViewMode] = useState('grid')
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    dispatch(fetchEvents(filters))
  }, [dispatch, filters])

  const handleFilterChange = (newFilters) => {
    setLocalFilters(newFilters)
    dispatch(setFilters(newFilters))
  }

  const categories = [
    'All',
    'Music',
    'Sports',
    'Arts',
    'Food',
    'Business',
    'Community',
    'Technology'
  ]

  return (
    <div className="min-h-screen mt-32 bg-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-red-500 mb-4">
            Discover Events
          </h1>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Find amazing events, concerts, conferences, and more in your area
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  value={localFilters.search}
                  onChange={(e) => handleFilterChange({ ...localFilters, search: e.target.value })}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-4 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                    localFilters.category === category.toLowerCase()
                      ? 'bg-red-500 text-white'
                      : 'bg-primary-200 text-charcoal-700 hover:bg-primary-300'
                  }`}
                  onClick={() => handleFilterChange({
                    ...localFilters,
                    category: category === 'All' ? '' : category.toLowerCase()
                  })}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <button
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-red-500 text-white' : 'bg-primary-200 text-charcoal-700'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-xl transition-all ${
                  viewMode === 'list' ? 'bg-red-500 text-white' : 'bg-primary-200 text-charcoal-700'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="card p-4 animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="h-48 bg-primary-200 rounded-xl mb-4" />
                <div className="h-4 bg-primary-200 rounded mb-2" />
                <div className="h-3 bg-primary-200 rounded w-3/4" />
              </motion.div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className={`grid gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
              layout
            >
              {events.map((event, index) => (
                <EventCard
                  key={event._id}
                  event={event}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>

            {events.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-charcoal-400" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                  No events found
                </h3>
                <p className="text-charcoal-600">
                  Try adjusting your filters to find more events
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default Events