// src/pages/Waitlist.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, Star, Users, Calendar, Ticket } from 'lucide-react'

const Waitlist = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    interest: 'host' // host or attendee
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle waitlist submission
    setSubmitted(true)
  }

  const features = [
    {
      icon: Ticket,
      title: 'Instant QR Tickets',
      description: 'Generate beautiful digital tickets with unique QR codes instantly.'
    },
    {
      icon: Users,
      title: 'Smart Analytics',
      description: 'Track sales, attendance, and revenue with real-time dashboards.'
    },
    {
      icon: Calendar,
      title: 'Easy Event Management',
      description: 'Create and manage events effortlessly with our intuitive tools.'
    },
    {
      icon: Star,
      title: 'Premium Experience',
      description: 'Delight your attendees with seamless ticketing and entry.'
    }
  ]

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold text-charcoal-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Join the{' '}
            <span className="text-accent-500">Waitlist</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-charcoal-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Be among the first to experience the future of event ticketing. 
            Get early access to PASA's powerful platform.
          </motion.p>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border border-primary-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all"
                />
              </div>
              
              <div className="flex space-x-4 justify-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="interest"
                    value="host"
                    checked={formData.interest === 'host'}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="mr-2"
                  />
                  <span>I'm a Host</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="interest"
                    value="attendee"
                    checked={formData.interest === 'attendee'}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="mr-2"
                  />
                  <span>I'm an Attendee</span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto btn-primary text-lg px-12 py-4"
              >
                Join Waitlist
              </button>
              
              <p className="text-sm text-charcoal-500">
                By joining, you agree to receive updates about PASA. We respect your privacy.
              </p>
            </motion.form>
          ) : (
            <motion.div
              className="max-w-md mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-charcoal-900 mb-4">
                You're on the list!
              </h2>
              <p className="text-charcoal-600 mb-6">
                Thank you for joining the PASA waitlist. We'll notify you as soon as we launch.
              </p>
              <Link to="/" className="btn-primary">
                Back to Home
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-primary-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
              Why Join PASA?
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Experience the next generation of event ticketing with powerful features designed for creators and attendees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-accent-500" />
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
              Ready to transform your events?
            </h2>
            <p className="text-xl text-charcoal-600 mb-8">
              Join thousands of event creators who trust PASA for seamless ticketing experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                Get Started Free
              </Link>
              <Link to="/events" className="btn-secondary text-lg px-8 py-4">
                Browse Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Waitlist