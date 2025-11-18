// src/pages/host/CreateEvent.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Upload, MapPin, Calendar, Clock, DollarSign, Users, 
  Image, Check, ChevronRight, ChevronLeft 
} from 'lucide-react'

const CreateEvent = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    venue: {
      name: '',
      address: '',
      lat: '',
      lng: ''
    },
    dateStart: '',
    dateEnd: '',
    timezone: 'UTC',
    mainImage: '',
    gallery: [],
    vipImages: [],
    ticketTiers: [
      {
        name: 'General Admission',
        price: '',
        totalQty: '',
        seatMap: ''
      }
    ]
  })

  const steps = [
    { number: 1, title: 'Basic Info', icon: Users },
    { number: 2, title: 'Date & Time', icon: Calendar },
    { number: 3, title: 'Location', icon: MapPin },
    { number: 4, title: 'Tickets', icon: DollarSign },
    { number: 5, title: 'Images', icon: Image },
    { number: 6, title: 'Review', icon: Check }
  ]

  const categories = [
    'Music',
    'Sports',
    'Arts & Theater',
    'Food & Drink',
    'Business',
    'Community',
    'Technology',
    'Education',
    'Health & Wellness',
    'Other'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Creating event:', formData)
    navigate('/host/events')
  }

  const addTicketTier = () => {
    setFormData(prev => ({
      ...prev,
      ticketTiers: [
        ...prev.ticketTiers,
        {
          name: '',
          price: '',
          totalQty: '',
          seatMap: ''
        }
      ]
    }))
  }

  const removeTicketTier = (index) => {
    if (formData.ticketTiers.length > 1) {
      setFormData(prev => ({
        ...prev,
        ticketTiers: prev.ticketTiers.filter((_, i) => i !== index)
      }))
    }
  }

  const updateTicketTier = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      ticketTiers: prev.ticketTiers.map((tier, i) => 
        i === index ? { ...tier, [field]: value } : tier
      )
    }))
  }

  const handleImageUpload = (e, type = 'mainImage') => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'mainImage') {
          setFormData(prev => ({ ...prev, mainImage: reader.result }))
        } else if (type === 'gallery') {
          setFormData(prev => ({ 
            ...prev, 
            gallery: [...prev.gallery, reader.result] 
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit(new Event('submit'))
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
        return formData.title && formData.description && formData.category
      case 2:
        return formData.dateStart && formData.dateEnd
      case 3:
        return formData.venue.name && formData.venue.address
      case 4:
        return formData.ticketTiers.every(tier => tier.name && tier.price && tier.totalQty)
      case 5:
        return formData.mainImage
      case 6:
        return true
      default:
        return false
    }
  }

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Tell us about your event
              </h3>
              <p className="text-charcoal-600">
                Start with the basic details
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="Enter event title"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all resize-none"
                  placeholder="Describe your event..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                When is your event?
              </h3>
              <p className="text-charcoal-600">
                Set the date and time
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.dateStart}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateStart: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.dateEnd}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateEnd: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Where is your event?
              </h3>
              <p className="text-charcoal-600">
                Add the venue details
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venue.name}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    venue: { ...prev.venue, name: e.target.value } 
                  }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="Enter venue name"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venue.address}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    venue: { ...prev.venue, address: e.target.value } 
                  }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  placeholder="Enter full address"
                />
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Set up tickets
              </h3>
              <p className="text-charcoal-600">
                Create your ticket tiers and pricing
              </p>
            </div>

            <div className="space-y-6">
              {formData.ticketTiers.map((tier, index) => (
                <div key={index} className="p-6 border border-primary-300 rounded-xl bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-charcoal-900">
                      Tier {index + 1}
                    </h3>
                    {formData.ticketTiers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTicketTier(index)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-2">
                        Tier Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={tier.name}
                        onChange={(e) => updateTicketTier(index, 'name', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        placeholder="e.g., General Admission"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-2">
                        Price ($) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={tier.price}
                        onChange={(e) => updateTicketTier(index, 'price', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-700 mb-2">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={tier.totalQty}
                        onChange={(e) => updateTicketTier(index, 'totalQty', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addTicketTier}
                className="w-full p-4 border-2 border-dashed border-green-500 text-green-500 hover:bg-green-50 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>+</span>
                <span>Add Another Ticket Tier</span>
              </button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Add event images
              </h3>
              <p className="text-charcoal-600">
                Upload photos to showcase your event
              </p>
            </div>

            <div className="space-y-6">
              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-4">
                  Main Event Image *
                </label>
                {formData.mainImage ? (
                  <div className="relative">
                    <img 
                      src={formData.mainImage} 
                      alt="Main event" 
                      className="w-full h-64 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, mainImage: '' }))}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <span className="w-4 h-4">×</span>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-green-500 rounded-xl cursor-pointer hover:bg-green-50 transition-all">
                    <Upload className="w-12 h-12 text-green-500 mb-2" />
                    <span className="text-green-500 font-medium">Upload Main Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'mainImage')}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-medium text-charcoal-700 mb-4">
                  Gallery Images (Optional)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.gallery.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  {formData.gallery.length < 6 && (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all">
                      <Upload className="w-6 h-6 text-charcoal-500 mb-1" />
                      <span className="text-xs text-charcoal-500">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'gallery')}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Ready to create!
              </h3>
              <p className="text-charcoal-600">
                Review your event details before publishing
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-4">Event Summary:</h4>
              <div className="space-y-3 text-sm text-green-700">
                <div className="flex justify-between">
                  <span>Title:</span>
                  <span className="font-medium">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">
                    {formData.dateStart ? new Date(formData.dateStart).toLocaleDateString() : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Venue:</span>
                  <span className="font-medium">{formData.venue.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ticket Tiers:</span>
                  <span className="font-medium">{formData.ticketTiers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Main Image:</span>
                  <span className="font-medium">{formData.mainImage ? 'Uploaded' : 'Not set'}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-sm text-yellow-800 text-center">
                Your event will be created as a draft. You can publish it when you're ready.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/host/events')}
              className="btn-secondary p-3"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-4xl font-display font-bold text-charcoal-900">
                Create Event
              </h1>
              <p className="text-charcoal-600">
                Set up your event and start selling tickets
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 px-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  currentStep >= step.number
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-200 text-charcoal-600'
                }`}>
                  {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <span className={`text-xs mt-2 ${
                  currentStep >= step.number ? 'text-green-600 font-medium' : 'text-charcoal-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all ${
                  currentStep > step.number ? 'bg-green-500' : 'bg-primary-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
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

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-green-500 text-green-500 hover:bg-green-50 rounded-full font-semibold transition-all duration-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate('/host/events')}
                      className="px-6 py-3 text-charcoal-600 hover:text-charcoal-800 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`flex items-center space-x-2 px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
                      isStepValid()
                        ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                        : 'bg-primary-200 text-charcoal-400 cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {currentStep === steps.length ? 'Create Event' : 'Continue'}
                    </span>
                    {currentStep < steps.length && <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="card p-6 sticky top-32"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                  Quick Preview
                </h3>

                <div className="space-y-4 text-sm text-charcoal-600">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Draft
                    </span>
                  </div>

                  {formData.title && (
                    <div>
                      <span className="font-medium text-charcoal-900">Title:</span>
                      <p className="mt-1 text-xs">{formData.title}</p>
                    </div>
                  )}

                  {formData.category && (
                    <div>
                      <span className="font-medium text-charcoal-900">Category:</span>
                      <p className="mt-1 text-xs">{formData.category}</p>
                    </div>
                  )}

                  {formData.dateStart && (
                    <div>
                      <span className="font-medium text-charcoal-900">Date:</span>
                      <p className="mt-1 text-xs">{new Date(formData.dateStart).toLocaleDateString()}</p>
                    </div>
                  )}

                  {formData.mainImage && (
                    <div>
                      <span className="font-medium text-charcoal-900">Main Image:</span>
                      <img 
                        src={formData.mainImage} 
                        alt="Preview" 
                        className="mt-2 w-full h-20 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent