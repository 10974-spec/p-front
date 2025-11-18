// src/components/Search/SearchBar.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Calendar, Filter } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../../store/slices/eventsSlice'

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    category: ''
  })
  const dispatch = useDispatch()

  const handleSearch = () => {
    dispatch(setFilters(searchParams))
    setIsExpanded(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="relative">
      {/* Compact Search Bar */}
      <motion.div
        className="search-bar-glass px-4 py-3 cursor-pointer"
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Search className="w-4 h-4 text-charcoal-500" />
            <div>
              <p className="text-sm font-medium text-charcoal-700">Anywhere</p>
              <p className="text-xs text-charcoal-500">Any week • Add guests</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full border border-charcoal-300 flex items-center justify-center">
            <Filter className="w-3 h-3 text-charcoal-600" />
          </div>
        </div>
      </motion.div>

      {/* Expanded Search Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              className="glass rounded-3xl w-full max-w-2xl p-6 shadow-floating"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-charcoal-900 mb-4">
                  Search Events
                </h3>
                
                {/* Location Input */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-charcoal-700">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Where are you looking?"
                    className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                    value={searchParams.location}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                {/* Date Input */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-medium text-charcoal-700">
                    <Calendar className="w-4 h-4" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                {/* Category Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-charcoal-700">
                    Category
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                    value={searchParams.category}
                    onChange={(e) => setSearchParams(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">All Categories</option>
                    <option value="music">Music</option>
                    <option value="sports">Sports</option>
                    <option value="arts">Arts & Theater</option>
                    <option value="food">Food & Drink</option>
                    <option value="business">Business</option>
                    <option value="community">Community</option>
                  </select>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full btn-primary mt-4"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Events
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBar