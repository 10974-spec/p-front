// src/pages/auth/Signup.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/slices/authSlice'
import { Mail, Lock, User, Eye, EyeOff, Building, Phone, ChevronRight, ChevronLeft, Check } from 'lucide-react'

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'buyer',
    businessName: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const steps = [
    { number: 1, title: 'Personal Info', field: 'name' },
    { number: 2, title: 'Contact Details', field: 'email' },
    { number: 3, title: 'Security', field: 'password' },
    { number: 4, title: 'Role Selection', field: 'role' },
    { number: 5, title: 'Complete', field: 'complete' }
  ]

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    }
    setFormData(newFormData)
    
    // Mark step as completed if valid
    setTimeout(() => {
      if (isStepValid(currentStep, newFormData)) {
        setCompletedSteps(prev => new Set([...prev, currentStep]))
      }
    }, 100)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      // Mark current step as completed before moving
      if (isStepValid(currentStep)) {
        setCompletedSteps(prev => new Set([...prev, currentStep]))
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentStep === steps.length) {
      const result = await dispatch(registerUser(formData))
      if (result.type === 'auth/register/fulfilled') {
        navigate('/dashboard')
      }
    } else {
      nextStep()
    }
  }

  const isStepValid = (step = currentStep, data = formData) => {
    switch (step) {
      case 1:
        return data.name.trim().length >= 2
      case 2:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
      case 3:
        return data.password.length >= 6
      case 4:
        return data.role
      default:
        return true
    }
  }

  // Calculate progress percentage
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                What's your name?
              </h3>
              <p className="text-charcoal-600">
                Let's start with the basics
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg"
                  placeholder="Enter your full name"
                  autoFocus
                />
                {completedSteps.has(1) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Contact information
              </h3>
              <p className="text-charcoal-600">
                How can we reach you?
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg"
                  placeholder="Enter your email"
                  autoFocus
                />
                {completedSteps.has(2) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </div>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg"
                  placeholder="Phone number (optional)"
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
                Create a password
              </h3>
              <p className="text-charcoal-600">
                Keep your account secure
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 rounded-full border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg"
                  placeholder="Create a secure password"
                  autoFocus
                />
                <button
                  type="button"
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {completedSteps.has(3) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Check className="w-5 h-5 text-green-500" />
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-charcoal-500 text-center">
                Must be at least 6 characters long
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                How will you use PASA?
              </h3>
              <p className="text-charcoal-600">
                Choose your primary role
              </p>
            </div>
            
            <div className="space-y-4">
              <label className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                formData.role === 'buyer' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-primary-300 hover:border-primary-400'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="buyer"
                  checked={formData.role === 'buyer'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  formData.role === 'buyer' 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-primary-400'
                }`}>
                  {formData.role === 'buyer' && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-charcoal-900">Event Goer</div>
                  <div className="text-sm text-charcoal-600">Browse and attend amazing events</div>
                </div>
                <User className="w-6 h-6 text-charcoal-400 ml-4" />
              </label>
              
              <label className={`flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                formData.role === 'host' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-primary-300 hover:border-primary-400'
              }`}>
                <input
                  type="radio"
                  name="role"
                  value="host"
                  checked={formData.role === 'host'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  formData.role === 'host' 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-primary-400'
                }`}>
                  {formData.role === 'host' && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-charcoal-900">Event Host</div>
                  <div className="text-sm text-charcoal-600">Create and manage your events</div>
                </div>
                <Building className="w-6 h-6 text-charcoal-400 ml-4" />
              </label>
            </div>

            {formData.role === 'host' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                  <input
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all text-lg"
                    placeholder="Business/organization name"
                  />
                </div>
              </motion.div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Ready to go!
              </h3>
              <p className="text-charcoal-600">
                You're all set to {formData.role === 'host' ? 'create amazing events' : 'discover amazing events'}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-4">
              <div className="text-sm text-green-800 text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="font-semibold hover:underline">Terms</Link> and{' '}
                <Link to="/privacy" className="font-semibold hover:underline">Privacy Policy</Link>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center py-12 px-4">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
   <div className="text-center mb-8">
  <Link to="/" className="inline-flex items-center space-x-2 mb-6">
    <img 
      src="/src/assets/logo.png" 
      alt="PASA Logo" 
      className="size-24" 
    />
  </Link>
</div>

        {/* Progress Bar */}
        <div className="mb-8 px-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-charcoal-700">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-green-600">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-primary-200 rounded-full h-2">
            <motion.div
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 px-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  completedSteps.has(step.number) || currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-green-100 border-2 border-green-500 text-green-600'
                    : 'bg-primary-200 text-charcoal-600'
                }`}>
                  {completedSteps.has(step.number) || currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`text-xs mt-2 hidden sm:block ${
                  completedSteps.has(step.number) || currentStep >= step.number
                    ? 'text-green-600 font-medium'
                    : 'text-charcoal-500'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 transition-all ${
                  completedSteps.has(step.number + 1) || currentStep > step.number
                    ? 'bg-green-500'
                    : 'bg-primary-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Signup Form */}
        <motion.form
          className="card p-8"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

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
          <div className="flex space-x-4 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 bg-white border-2 border-green-500 text-green-500 hover:bg-green-50 rounded-full py-4 flex items-center justify-center space-x-2 transition-all duration-200 font-semibold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            )}
            
            <button
              type="submit"
              disabled={!isStepValid() || loading}
              className={`flex-1 rounded-full py-4 font-semibold transition-all flex items-center justify-center space-x-2 ${
                isStepValid() && !loading
                  ? 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
                  : 'bg-primary-200 text-charcoal-400 cursor-not-allowed'
              }`}
            >
              <span>
                {loading ? 'Creating...' : currentStep === steps.length ? 'Create Account' : 'Continue'}
              </span>
              {currentStep < steps.length && !loading && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Login Link */}
          {currentStep === 1 && (
            <div className="text-center mt-6 pt-6 border-t border-primary-200">
              <span className="text-charcoal-600">Already have an account? </span>
              <Link
                to="/login"
                className="text-green-500 hover:text-green-600 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          )}
        </motion.form>
      </motion.div>
    </div>
  )
}

// Calendar icon component
const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

export default Signup