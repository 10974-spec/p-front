// src/pages/Events.jsx
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents, setFilters } from '../store/slices/eventsSlice'
import EventCard from '../components/Event/EventCard'
import { 
  Filter, Grid, List, Search, MapPin, Calendar, 
  DollarSign, X, ChevronDown, ChevronUp, SlidersHorizontal 
} from 'lucide-react'

const Events = () => {
  const dispatch = useDispatch()
  const { events, loading, filters } = useSelector((state) => state.events)
  const [viewMode, setViewMode] = useState('grid')
  const [localFilters, setLocalFilters] = useState(filters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [countries, setCountries] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const filterRef = useRef(null)
  const filterButtonRef = useRef(null)
  
  // Banner images - using your assets
  const banners = [
    '/src/assets/banner1.jpg',
    '/src/assets/banner2.jpg', 
    '/src/assets/banner3.jpg',
    '/src/assets/banner4.jpg'
  ]

  // Price ranges
  const priceRanges = [
    { label: 'Any Price', min: 0, max: Infinity },
    { label: 'Free', min: 0, max: 0 },
    { label: 'Under $10', min: 0, max: 10 },
    { label: '$10 - $25', min: 10, max: 25 },
    { label: '$25 - $50', min: 25, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: 'Over $100', min: 100, max: Infinity },
  ]

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

  useEffect(() => {
    dispatch(fetchEvents(filters))
  }, [dispatch, filters])

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current && 
        !filterRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries()
  }, [])

  // Fetch locations when country changes
  useEffect(() => {
    if (selectedCountry) {
      fetchLocations(selectedCountry)
    }
  }, [selectedCountry])

  // Banner slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length])

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      const data = await response.json()
      const sortedCountries = data
        .map(country => ({
          name: country.name.common,
          code: country.cca2
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
      
      setCountries(sortedCountries)
    } catch (error) {
      console.error('Error fetching countries:', error)
      setCountries([
        { name: 'Kenya', code: 'KE' },
        { name: 'United States', code: 'US' },
        { name: 'United Kingdom', code: 'GB' },
        { name: 'Canada', code: 'CA' },
        { name: 'Australia', code: 'AU' },
        { name: 'Germany', code: 'DE' },
        { name: 'France', code: 'FR' },
        { name: 'Nigeria', code: 'NG' },
        { name: 'South Africa', code: 'ZA' },
        { name: 'Uganda', code: 'UG' },
      ])
    }
  }

  const fetchLocations = async (countryName) => {
    try {
      const mockLocations = {
        'Kenya': ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Nyeri'],
        'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'],
        'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol', 'Glasgow', 'Edinburgh', 'Leeds'],
        'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City'],
        'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Hobart'],
      }
      
      if (mockLocations[countryName]) {
        setLocations(mockLocations[countryName])
      } else {
        setLocations([
          `${countryName} City`,
          `Central ${countryName}`,
          `North ${countryName}`,
          `South ${countryName}`,
          `East ${countryName}`,
          `West ${countryName}`,
        ])
      }
    } catch (error) {
      console.error('Error fetching locations:', error)
      setLocations([])
    }
  }

  const handleFilterChange = useCallback((newFilters) => {
    setLocalFilters(newFilters)
    dispatch(setFilters(newFilters))
    // Auto-close filters on mobile after applying
    if (window.innerWidth < 1024) {
      setIsFilterOpen(false)
    }
  }, [dispatch])

  const handlePriceChange = (priceRange) => {
    handleFilterChange({
      ...localFilters,
      priceMin: priceRange.min,
      priceMax: priceRange.max === Infinity ? undefined : priceRange.max
    })
  }

  const handleDateChange = (dateType, value) => {
    handleFilterChange({
      ...localFilters,
      [dateType]: value
    })
  }

  const handleCountryChange = (country) => {
    setSelectedCountry(country)
    setLocationSearch('')
    handleFilterChange({
      ...localFilters,
      country,
      location: ''
    })
  }

  const handleLocationChange = (location) => {
    handleFilterChange({
      ...localFilters,
      location
    })
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      priceMin: undefined,
      priceMax: undefined,
      startDate: undefined,
      endDate: undefined,
      country: '',
      location: ''
    }
    setLocalFilters(clearedFilters)
    setSelectedCountry('')
    setLocationSearch('')
    dispatch(setFilters(clearedFilters))
  }

  const filteredLocations = useMemo(() => {
    if (!locationSearch) return locations
    return locations.filter(location =>
      location.toLowerCase().includes(locationSearch.toLowerCase())
    )
  }, [locations, locationSearch])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (localFilters.priceMin !== undefined) count++
    if (localFilters.startDate) count++
    if (localFilters.endDate) count++
    if (localFilters.country) count++
    if (localFilters.location) count++
    if (localFilters.category) count++
    return count
  }, [localFilters])

  return (
    <div className="min-h-screen mt-32 bg-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Banner */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-red-500 mb-4">
            Discover Events
          </h1>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto mb-8">
            Find amazing events, concerts, conferences, and more in your area
          </p>
          
          {/* Banner Slideshow */}
          <div className="relative h-48 md:h-56 lg:h-64 mb-8 rounded-2xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentBannerIndex}
                src={banners[currentBannerIndex]}
                alt={`Event Banner ${currentBannerIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-${currentBannerIndex === 0 ? '1533174072545-7a4b6ad7a6c3' : currentBannerIndex === 1 ? '1540575467063-178a50c7dfce' : '1511578314322-379afb476865'}?w=1200&q=80`
                }}
              />
            </AnimatePresence>
            
            {/* Banner Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentBannerIndex === index 
                      ? 'bg-white w-4' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                  onClick={() => setCurrentBannerIndex(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative">
          {/* Filter Button (Floating on Left) */}
          <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 lg:static lg:transform-none lg:left-auto lg:top-auto lg:mb-6">
            <div ref={filterButtonRef} className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white transition-all rounded-xl shadow-lg hover:shadow-xl"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-white text-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
                {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Filter Dropdown (Left Side) */}
          <AnimatePresence>
            {isFilterOpen && (
              <>
                {/* Mobile Overlay */}
                <div 
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
                  onClick={() => setIsFilterOpen(false)} 
                />
                
                {/* Filter Panel */}
                <div ref={filterRef} className="fixed left-0 top-0 h-full w-80 sm:w-96 lg:w-80 lg:absolute lg:left-4 lg:top-24 lg:h-auto lg:max-h-[80vh] z-50">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="h-full lg:h-auto bg-white rounded-r-2xl lg:rounded-2xl shadow-2xl border border-primary-200 overflow-y-auto"
                  >
                    <div className="p-6">
                      {/* Filter Header */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary-200">
                        <div className="flex items-center gap-2">
                          <Filter className="w-5 h-5 text-red-500" />
                          <h2 className="text-xl font-semibold text-charcoal-900">Filters</h2>
                          {activeFilterCount > 0 && (
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                              {activeFilterCount} active
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="p-1 hover:bg-primary-100 rounded-lg transition-colors lg:hidden"
                        >
                          <X className="w-5 h-5 text-charcoal-500" />
                        </button>
                      </div>

                      {/* Price Filter */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-charcoal-700 mb-3 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          Price Range
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {priceRanges.map((range) => (
                            <button
                              key={range.label}
                              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                                localFilters.priceMin === range.min && 
                                localFilters.priceMax === (range.max === Infinity ? undefined : range.max)
                                  ? 'bg-red-500 text-white'
                                  : 'bg-primary-100 text-charcoal-700 hover:bg-primary-200'
                              }`}
                              onClick={() => handlePriceChange(range)}
                            >
                              {range.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Date Filter */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-charcoal-700 mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Date Range
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs text-charcoal-500 mb-1">From</label>
                            <input
                              type="date"
                              className="w-full px-3 py-2 rounded-lg border border-primary-300 focus:border-red-500 focus:ring-1 focus:ring-red-200 outline-none"
                              value={localFilters.startDate || ''}
                              onChange={(e) => handleDateChange('startDate', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-charcoal-500 mb-1">To</label>
                            <input
                              type="date"
                              className="w-full px-3 py-2 rounded-lg border border-primary-300 focus:border-red-500 focus:ring-1 focus:ring-red-200 outline-none"
                              value={localFilters.endDate || ''}
                              onChange={(e) => handleDateChange('endDate', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Location Filter */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-charcoal-700 mb-3 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </h3>
                        
                        {/* Country Select */}
                        <div className="mb-3">
                          <label className="block text-xs text-charcoal-500 mb-1">Country</label>
                          <select
                            className="w-full px-3 py-2 rounded-lg border border-primary-300 focus:border-red-500 focus:ring-1 focus:ring-red-200 outline-none bg-white"
                            value={selectedCountry}
                            onChange={(e) => handleCountryChange(e.target.value)}
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option key={country.code} value={country.name}>
                                {country.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* City/Location Select */}
                        {selectedCountry && (
                          <div>
                            <label className="block text-xs text-charcoal-500 mb-1">City/Location</label>
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-4 h-4" />
                              <input
                                type="text"
                                placeholder="Search locations..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-300 focus:border-red-500 focus:ring-1 focus:ring-red-200 outline-none"
                                value={locationSearch}
                                onChange={(e) => setLocationSearch(e.target.value)}
                              />
                            </div>
                            
                            {locationSearch && filteredLocations.length > 0 && (
                              <div className="mt-2 max-h-32 overflow-y-auto rounded-lg border border-primary-300 bg-white">
                                {filteredLocations.map((location) => (
                                  <button
                                    key={location}
                                    className={`w-full text-left px-3 py-2 hover:bg-primary-50 transition-colors text-sm ${
                                      localFilters.location === location 
                                        ? 'bg-red-50 text-red-600' 
                                        : 'text-charcoal-700'
                                    }`}
                                    onClick={() => handleLocationChange(location)}
                                  >
                                    {location}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-primary-200 flex gap-3">
                        <button
                          onClick={clearAllFilters}
                          className="flex-1 px-4 py-2 border border-primary-300 text-charcoal-700 hover:bg-primary-100 rounded-lg transition-colors text-sm font-medium"
                        >
                          Clear All
                        </button>
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="flex-1 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors text-sm font-medium"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>

          {/* Category Filter Pills and View Toggle */}
          <motion.div
            className="mb-8 ml-16 lg:ml-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              {/* Category Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0 ${
                      localFilters.category === (category === 'All' ? '' : category.toLowerCase())
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
                <div className="text-sm text-charcoal-600 hidden sm:block">
                  {events.length} events found
                </div>
                <div className="flex bg-primary-200 rounded-xl p-1">
                  <button
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid' ? 'bg-white text-red-500 shadow-sm' : 'text-charcoal-700'
                    }`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list' ? 'bg-white text-red-500 shadow-sm' : 'text-charcoal-700'
                    }`}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <motion.div
              className="mb-6 ml-16 lg:ml-0"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-charcoal-700 font-medium">Active filters:</span>
                {localFilters.priceMin !== undefined && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    ${localFilters.priceMin} - ${localFilters.priceMax || '∞'}
                    <button 
                      onClick={() => handlePriceChange({ min: 0, max: Infinity })}
                      className="hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {localFilters.startDate && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    From {new Date(localFilters.startDate).toLocaleDateString()}
                    <button 
                      onClick={() => handleDateChange('startDate', '')}
                      className="hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {localFilters.endDate && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    To {new Date(localFilters.endDate).toLocaleDateString()}
                    <button 
                      onClick={() => handleDateChange('endDate', '')}
                      className="hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {localFilters.country && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    {localFilters.country}
                    <button 
                      onClick={() => handleCountryChange('')}
                      className="hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {localFilters.location && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    {localFilters.location}
                    <button 
                      onClick={() => handleLocationChange('')}
                      className="hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {localFilters.category && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                    {localFilters.category}
                    <button 
                      onClick={() => handleFilterChange({ ...localFilters, category: '' })}
                      className="hover:text-red-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 px-3 py-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            </motion.div>
          )}

          {/* Events Grid */}
          <div className="ml-16 lg:ml-0">
            {loading ? (
              <div className={`grid gap-8 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}>
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
                    <p className="text-charcoal-600 mb-4">
                      Try adjusting your filters to find more events
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events