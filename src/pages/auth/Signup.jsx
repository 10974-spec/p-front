// src/pages/auth/Signup.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/slices/authSlice'
import { 
  Mail, Lock, User, Eye, EyeOff, Building, Phone, 
  ChevronRight, ChevronLeft, Check, CreditCard, 
  Banknote, Smartphone, Globe
} from 'lucide-react'

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'buyer',
    businessName: '',
    bankDetails: {
      bankName: '',
      accountNo: ''
    },
    mpesaNumber: ''
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
    { number: 5, title: 'Business Details', field: 'business' },
    { number: 6, title: 'Complete', field: 'complete' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData }
    
    // Handle nested fields (bankDetails)
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      newFormData[parent] = { ...newFormData[parent], [child]: value }
    } else {
      newFormData[name] = value
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
      // Prepare final data
      const registrationData = {
        ...formData,
        // Only include business fields for hosts
        ...(formData.role === 'host' ? {
          businessName: formData.businessName,
          bankDetails: formData.bankDetails.bankName && formData.bankDetails.accountNo 
            ? formData.bankDetails 
            : undefined,
          mpesaNumber: formData.mpesaNumber || undefined
        } : {})
      }
      
      const result = await dispatch(registerUser(registrationData))
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
      case 5:
        if (data.role === 'host') {
          return data.businessName.trim().length >= 2
        }
        return true
      default:
        return true
    }
  }

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
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg"
                  placeholder="Enter your full name"
                  autoFocus
                />
                {completedSteps.has(1) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Check className="w-5 h-5 text-red-500" />
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
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg"
                  placeholder="Enter your email"
                  autoFocus
                />
                {completedSteps.has(2) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <Check className="w-5 h-5 text-red-500" />
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
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg"
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
                  className="w-full pl-12 pr-12 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg"
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
                    <Check className="w-5 h-5 text-red-500" />
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
                  ? 'border-red-500 bg-red-50' 
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
                    ? 'border-red-500 bg-red-500' 
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
                  ? 'border-red-500 bg-red-50' 
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
                    ? 'border-red-500 bg-red-500' 
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
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Business Information
              </h3>
              <p className="text-charcoal-600">
                {formData.role === 'host' 
                  ? 'Tell us about your business' 
                  : 'Additional information'}
              </p>
            </div>

            <AnimatePresence>
              {formData.role === 'host' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {/* Business Name */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      Business/Organization Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                      <input
                        name="businessName"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                        placeholder="Enter business name"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Bank Details Section */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-charcoal-900 flex items-center">
                      <Banknote className="w-5 h-5 mr-2" />
                      Bank Details (Optional)
                    </h4>
                    
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                      <input
                        name="bankDetails.bankName"
                        type="text"
                        value={formData.bankDetails.bankName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                        placeholder="Bank Name (e.g., Equity Bank)"
                      />
                    </div>

                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                      <input
                        name="bankDetails.accountNo"
                        type="text"
                        value={formData.bankDetails.accountNo}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                        placeholder="Account Number"
                      />
                    </div>
                  </div>

                  {/* M-Pesa Number */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal-700 mb-2">
                      M-Pesa Number (Optional)
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                      <input
                        name="mpesaNumber"
                        type="tel"
                        value={formData.mpesaNumber}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                        placeholder="+254 7XX XXX XXX"
                      />
                    </div>
                    <p className="text-xs text-charcoal-500 mt-2">
                      Used for mobile money transactions. Format: +254...
                    </p>
                  </div>
                </motion.div>
              )}

              {formData.role === 'buyer' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-charcoal-900 mb-2">
                    Almost there!
                  </h4>
                  <p className="text-charcoal-600">
                    You're ready to explore amazing events
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {completedSteps.has(5) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex justify-center"
              >
                <Check className="w-8 h-8 text-red-500" />
              </motion.div>
            )}
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Ready to go!
              </h3>
              <p className="text-charcoal-600">
                You're all set to {formData.role === 'host' ? 'create amazing events' : 'discover amazing events'}
              </p>
            </div>

            {/* Summary Card */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h4 className="font-semibold text-red-800 mb-4">Registration Summary:</h4>
              <div className="space-y-3 text-sm text-red-700">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="font-medium capitalize">{formData.role}</span>
                </div>
                
                {formData.role === 'host' && formData.businessName && (
                  <div className="flex justify-between">
                    <span>Business:</span>
                    <span className="font-medium">{formData.businessName}</span>
                  </div>
                )}
                
                {formData.phone && (
                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="font-medium">{formData.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
              <div className="text-sm text-yellow-800 text-center">
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
    <div className="min-h-screen bg-primary-50 flex">
      {/* Left Side - Logo Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-red-500 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
          onClick={() => navigate('/')}
        >
          <img 
            src="/src/assets/left.png" 
            alt="PASA Event Platform" 
            className="max-w-full h-auto max-h-96 object-contain cursor-pointer"
          />
          <motion.h1 
            className="text-4xl font-display font-bold text-white mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Pasa Events
          </motion.h1>
          <motion.p 
            className="text-red-100 text-xl mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Join Our Community Today
          </motion.p>
        </motion.div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-6">
              <img 
                src="/src/assets/logo2.png" 
                alt="PASA Logo" 
                className="size-16" 
              />
            </Link>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 px-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-charcoal-700">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm font-medium text-red-600">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="w-full bg-primary-200 rounded-full h-2">
              <motion.div
                className="bg-red-500 h-2 rounded-full"
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
                      ? 'bg-red-500 text-white'
                      : currentStep === step.number
                      ? 'bg-red-100 border-2 border-red-500 text-red-600'
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
                      ? 'text-red-600 font-medium'
                      : 'text-charcoal-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    completedSteps.has(step.number + 1) || currentStep > step.number
                      ? 'bg-red-500'
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
                  className="flex-1 bg-white border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-full py-4 flex items-center justify-center space-x-2 transition-all duration-200 font-semibold"
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
                    ? 'bg-red-500 hover:bg-red-600 text-white transform hover:scale-105'
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
                  className="text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup