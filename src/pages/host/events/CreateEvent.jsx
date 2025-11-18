// src/pages/host/CreateEvent.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, MapPin, Calendar, Clock, DollarSign, Users } from 'lucide-react'

const CreateEvent = () => {
  const navigate = useNavigate()
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
    ticketTiers: [
      {
        name: 'General Admission',
        price: '',
        totalQty: '',
        seatMap: ''
      }
    ]
  })

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
    // Handle event creation
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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-xl font-semibold text-charcoal-900 mb-4">
                  Basic Information
                </h2>
                
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
                      className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                      placeholder="Enter event title"
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
                      className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all resize-none"
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
                      className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Date & Time */}
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-charcoal-900 mb-4">
                  Date & Time
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Start Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      required
                      value={formData.dateStart}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateStart: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
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
                      className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-charcoal-900 mb-4">
                  Location
                </h2>
                
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
                      className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                      placeholder="Enter venue name"
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
                      className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                      placeholder="Enter full address"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Ticket Tiers */}
              <motion.div
                className="card p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-charcoal-900">
                    Ticket Tiers
                  </h2>
                  <button
                    type="button"
                    onClick={addTicketTier}
                    className="btn-secondary text-sm"
                  >
                    Add Tier
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.ticketTiers.map((tier, index) => (
                    <div key={index} className="p-4 border border-primary-300 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-charcoal-900">
                          Tier {index + 1}
                        </h3>
                        {formData.ticketTiers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTicketTier(index)}
                            className="text-red-500 hover:text-red-600"
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
                            className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
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
                            className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
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
                            className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                            placeholder="100"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
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
                  Event Preview
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
                      <p className="mt-1">{formData.title}</p>
                    </div>
                  )}

                  {formData.category && (
                    <div>
                      <span className="font-medium text-charcoal-900">Category:</span>
                      <p className="mt-1">{formData.category}</p>
                    </div>
                  )}

                  {formData.dateStart && (
                    <div>
                      <span className="font-medium text-charcoal-900">Date:</span>
                      <p className="mt-1">{new Date(formData.dateStart).toLocaleDateString()}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-primary-200">
                    <p className="text-xs text-charcoal-500">
                      Your event will be created as a draft. You can publish it when you're ready.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    Create Event
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/host/events')}
                    className="w-full btn-secondary"
                  >
                    Cancel
                  </button>
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