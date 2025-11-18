// src/pages/Checkout.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { createBooking } from '../store/slices/bookingsSlice'
import { ChevronRight, CreditCard, User, Ticket, Check } from 'lucide-react'

const Checkout = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentEvent: event } = useSelector((state) => state.events)
  const { loading } = useSelector((state) => state.bookings)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Ticket holder info
    attendees: [''],
    // Payment info
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  })

  const steps = [
    { number: 1, title: 'Ticket Details', icon: Ticket },
    { number: 2, title: 'Attendee Info', icon: User },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: Check },
  ]

  const handleAttendeeChange = (index, value) => {
    const newAttendees = [...formData.attendees]
    newAttendees[index] = value
    setFormData({ ...formData, attendees: newAttendees })
  }

  const addAttendee = () => {
    setFormData({
      ...formData,
      attendees: [...formData.attendees, '']
    })
  }

  const handleSubmit = async () => {
    const bookingData = {
      eventId,
      tierId: new URLSearchParams(window.location.search).get('tier'),
      quantity: parseInt(new URLSearchParams(window.location.search).get('quantity')),
      assignedTickets: formData.attendees.map(name => ({ name, email: '', phone: '' }))
    }

    const result = await dispatch(createBooking(bookingData))
    if (result.type === 'bookings/create/fulfilled') {
      setCurrentStep(4)
      // In real app, you'd process payment here
      setTimeout(() => {
        navigate(`/ticket/${result.payload.booking.id}`)
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Steps */}
        <motion.div
          className="card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.number
                      ? 'bg-accent-500 text-white'
                      : 'bg-primary-200 text-charcoal-500'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 font-medium ${
                    currentStep >= step.number ? 'text-charcoal-900' : 'text-charcoal-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-charcoal-400 mx-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  className="card p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-semibold text-charcoal-900 mb-6">
                    Ticket Details
                  </h2>
                  {/* Ticket summary would go here */}
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full btn-primary mt-6"
                  >
                    Continue to Attendee Info
                  </button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  className="card p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-semibold text-charcoal-900 mb-6">
                    Attendee Information
                  </h2>
                  <div className="space-y-4">
                    {formData.attendees.map((attendee, index) => (
                      <div key={index} className="space-y-2">
                        <label className="text-sm font-medium text-charcoal-700">
                          Attendee {index + 1} Full Name
                        </label>
                        <input
                          type="text"
                          value={attendee}
                          onChange={(e) => handleAttendeeChange(index, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                          placeholder="Enter full name"
                        />
                      </div>
                    ))}
                    <button
                      onClick={addAttendee}
                      className="text-accent-500 hover:text-accent-600 font-medium"
                    >
                      + Add another attendee
                    </button>
                  </div>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full btn-primary mt-6"
                  >
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  className="card p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-2xl font-semibold text-charcoal-900 mb-6">
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <button className={`p-4 rounded-xl border-2 transition-all ${
                        formData.paymentMethod === 'card' 
                          ? 'border-accent-500 bg-accent-50' 
                          : 'border-primary-300'
                      }`}>
                        Credit Card
                      </button>
                      <button className={`p-4 rounded-xl border-2 transition-all ${
                        formData.paymentMethod === 'mpesa' 
                          ? 'border-accent-500 bg-accent-50' 
                          : 'border-primary-300'
                      }`}>
                        M-Pesa
                      </button>
                    </div>
                    
                    {/* Payment form would go here */}
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="w-full btn-primary mt-6 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Complete Purchase'}
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  className="card p-6 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">
                    Payment Successful!
                  </h2>
                  <p className="text-charcoal-600 mb-6">
                    Your tickets have been booked successfully. Redirecting to your tickets...
                  </p>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500 mx-auto"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="card p-6 sticky top-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
                Order Summary
              </h3>
              {event && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={event.mainImage}
                      alt={event.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-charcoal-900 line-clamp-2">
                        {event.title}
                      </h4>
                      <p className="text-sm text-charcoal-600">
                        {event.venue?.name}
                      </p>
                    </div>
                  </div>
                  
                  {/* Price breakdown would go here */}
                  
                  <div className="border-t border-primary-200 pt-4">
                    <div className="flex justify-between font-semibold text-charcoal-900">
                      <span>Total</span>
                      <span>$45.00</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout