import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Calendar, X, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setFilters } from '../../store/slices/eventsSlice'

const SearchModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    category: ''
  })
  const dispatch = useDispatch()

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = 'calc(100vw - 100%)' // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0'
    }
  }, [isOpen])

  const steps = [
    { number: 1, title: 'Location', field: 'location', icon: MapPin },
    { number: 2, title: 'Date', field: 'date', icon: Calendar },
    { number: 3, title: 'Category', field: 'category', icon: Search },
    { number: 4, title: 'Results', field: 'results', icon: Check }
  ]

  const handleSearch = () => {
    dispatch(setFilters(searchParams))
    handleClose()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isStepValid()) {
      nextStep()
    }
  }

  const handleReset = () => {
    setSearchParams({
      location: '',
      date: '',
      category: ''
    })
    setCurrentStep(1)
  }

  const handleClose = () => {
    setCurrentStep(1)
    setSearchParams({
      location: '',
      date: '',
      category: ''
    })
    onClose()
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSearch()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return searchParams.location.trim().length > 0
      case 2:
        return searchParams.date.length > 0
      case 3:
        return searchParams.category.length > 0
      default:
        return true
    }
  }

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Where are you looking?
              </h3>
              <p className="text-charcoal-600">
                Let's start with your location
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter city, venue, or area..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                When are you free?
              </h3>
              <p className="text-charcoal-600">
                Choose your preferred date
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, date: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                What type of event?
              </h3>
              <p className="text-charcoal-600">
                Select your preferred category
              </p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'music', label: '🎵 Music & Concerts', emoji: '🎵' },
                { value: 'sports', label: '⚽ Sports', emoji: '⚽' },
                { value: 'arts', label: '🎭 Arts & Theater', emoji: '🎭' },
                { value: 'food', label: '🍕 Food & Drink', emoji: '🍕' },
                { value: 'business', label: '💼 Business & Networking', emoji: '💼' },
                { value: 'community', label: '👥 Community', emoji: '👥' },
                { value: 'workshops', label: '🔧 Workshops & Classes', emoji: '🔧' },
                { value: 'conferences', label: '🎤 Conferences', emoji: '🎤' }
              ].map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setSearchParams(prev => ({ ...prev, category: category.value }))
                    setTimeout(nextStep, 300)
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    searchParams.category === category.value
                      ? 'border-red-500 bg-green-50 text-red-700'
                      : 'border-primary-300 hover:border-red-300 hover:bg-primary-50'
                  }`}
                >
                  <span className="text-lg mr-3">{category.emoji}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Perfect! Let's find events
              </h3>
              <p className="text-charcoal-600">
                We'll show you events matching your preferences
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-red-800 mb-2">Your Search Criteria:</h4>
              <div className="space-y-2 text-sm text-red-700">
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{searchParams.location || 'Anywhere'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">
                    {searchParams.date ? new Date(searchParams.date).toLocaleDateString() : 'Any date'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">
                    {searchParams.category ? 
                      [
                        { value: 'music', label: 'Music & Concerts' },
                        { value: 'sports', label: 'Sports' },
                        { value: 'arts', label: 'Arts & Theater' },
                        { value: 'food', label: 'Food & Drink' },
                        { value: 'business', label: 'Business' },
                        { value: 'community', label: 'Community' },
                        { value: 'workshops', label: 'Workshops' },
                        { value: 'conferences', label: 'Conferences' }
                      ].find(cat => cat.value === searchParams.category)?.label : 'All categories'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with enhanced blur */}
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Centered Modal Container */}
            <div className="min-h-screen flex items-center justify-center p-4">
              <motion.div
                className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-primary-200"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary-200">
                  <div>
                    <h3 className="text-xl font-display font-bold text-charcoal-900">
                      Find Events
                    </h3>
                    <p className="text-charcoal-600 text-sm mt-1">
                      Step {currentStep} of {steps.length}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-charcoal-500" />
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-primary-200">
                  {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                          currentStep >= step.number
                            ? 'bg-red-500 text-white'
                            : 'bg-primary-200 text-charcoal-600'
                        }`}>
                          {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                        </div>
                        <span className={`text-xs mt-2 ${
                          currentStep >= step.number ? 'text-red-600 font-medium' : 'text-charcoal-500'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 transition-all ${
                          currentStep > step.number ? 'bg-red-500' : 'bg-primary-200'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Step Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {getStepContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between p-6 border-t border-primary-200 bg-primary-50 rounded-b-2xl">
                  {currentStep > 1 ? (
                    <button
                      onClick={prevStep}
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-full font-semibold transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 text-charcoal-600 hover:text-charcoal-800 font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  
                  <button
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                      isStepValid()
                        ? 'bg-red-500 hover:bg-red-600 text-white transform hover:scale-105'
                        : 'bg-primary-200 text-charcoal-400 cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {currentStep === steps.length ? 'Find Events' : 'Continue'}
                    </span>
                    {currentStep < steps.length && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchModal