// src/pages/auth/Login.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/slices/authSlice'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginUser(formData))
    if (result.type === 'auth/login/fulfilled') {
      navigate('/dashboard')
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
        >
          <img 
            src="/src/assets/left.png" 
            alt="PASA Event Platform" 
            className="max-w-full h-auto max-h-96 object-contain"
          />
          <motion.h1 
            className="text-4xl font-display font-bold text-white mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            PASA Events
          </motion.h1>
          <motion.p 
            className="text-red-100 text-xl mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Your Gateway to Amazing Experiences
          </motion.p>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
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

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-charcoal-900">Welcome back</h2>
            <p className="mt-2 text-charcoal-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Login Form */}
          <motion.form
            className="card p-8 space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {error && (
              <motion.div
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-charcoal-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg"
                  placeholder="Enter your email"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-charcoal-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 rounded-full border border-primary-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all text-lg"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-primary-300 text-red-500 focus:ring-red-200"
                />
                <span className="ml-2 text-sm text-charcoal-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-full py-4 font-semibold transition-all ${
                !loading
                  ? 'bg-red-500 hover:bg-red-600 text-white transform hover:scale-105'
                  : 'bg-primary-200 text-charcoal-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary-300" />
              </div>
              {/* <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-charcoal-500">Or continue with</span>
              </div> */}
            </div>

            {/* Social Login */}
            {/* <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full bg-white border border-primary-300 text-charcoal-700 hover:bg-primary-50 rounded-full py-3 font-medium transition-all"
              >
                Google
              </button>
              <button
                type="button"
                className="w-full bg-white border border-primary-300 text-charcoal-700 hover:bg-primary-50 rounded-full py-3 font-medium transition-all"
              >
                Facebook
              </button>
            </div> */}

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-primary-200">
              <span className="text-charcoal-600">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}

export default Login