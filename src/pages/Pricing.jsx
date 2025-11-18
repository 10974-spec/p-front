// src/pages/Pricing.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Shield, 
  TrendingUp, 
  Smartphone, 
  Star, 
  Check, 
  HelpCircle,
  Zap,
  Users,
  CreditCard
} from 'lucide-react'

const Pricing = () => {
  const [calculatorData, setCalculatorData] = useState({
    ticketPrice: 1000,
    ticketsSold: 50,
    serviceFeeModel: 'flat',
    serviceFeeValue: 30,
    hostPlan: 'free',
    mpesaFeeMode: 'included'
  })

  const calculateResults = () => {
    const { ticketPrice, ticketsSold, serviceFeeModel, serviceFeeValue, mpesaFeeMode } = calculatorData
    
    // Calculate total ticket revenue
    const totalTicketRevenue = ticketPrice * ticketsSold
    
    // Calculate service fee (PASA revenue)
    let pasaEarnings = 0
    if (serviceFeeModel === 'flat') {
      pasaEarnings = serviceFeeValue * ticketsSold
    } else {
      pasaEarnings = (totalTicketRevenue * serviceFeeValue) / 100
    }
    
    // Calculate MPesa fees (approx 1.2% + fixed fee)
    const mpesaFeePerTransaction = Math.max(12, ticketPrice * 0.012) // ~KES 12-30
    const totalMpesaFees = mpesaFeeMode === 'pass-through' ? mpesaFeePerTransaction * ticketsSold : 0
    
    // Calculate what buyer pays
    const buyerPaysPerTicket = ticketPrice + (serviceFeeModel === 'flat' ? serviceFeeValue : (ticketPrice * serviceFeeValue) / 100)
    const totalBuyerPays = buyerPaysPerTicket * ticketsSold
    
    // Calculate host receives
    const hostReceivesPerTicket = ticketPrice - (mpesaFeeMode === 'pass-through' ? mpesaFeePerTransaction : 0)
    const totalHostReceives = hostReceivesPerTicket * ticketsSold

    return {
      buyerPaysPerTicket: Math.round(buyerPaysPerTicket),
      totalBuyerPays: Math.round(totalBuyerPays),
      hostReceivesPerTicket: Math.round(hostReceivesPerTicket),
      totalHostReceives: Math.round(totalHostReceives),
      pasaEarnings: Math.round(pasaEarnings),
      totalMpesaFees: Math.round(totalMpesaFees)
    }
  }

  const results = calculateResults()

  const features = [
    {
      icon: Shield,
      title: 'Transparent Fees',
      description: 'Only pay a small service fee. No monthly cost, no setup fees, no hidden charges.'
    },
    {
      icon: TrendingUp,
      title: 'Host Earnings',
      description: 'Instant dashboard updates, full pricing control. You keep 100% of your ticket price.'
    },
    {
      icon: Smartphone,
      title: 'Buyer Experience',
      description: 'Secure mobile-first checkout, instant QR tickets, email + SMS confirmations.'
    },
    {
      icon: Star,
      title: 'Why PASA Wins',
      description: 'Built for African events, MPesa-first, powerful analytics, reliable QR scanning.'
    }
  ]

  const faqs = [
    {
      question: 'How does PASA make money?',
      answer: 'We only earn a small service fee when you sell tickets. No monthly subscriptions or hidden costs.'
    },
    {
      question: 'Does the buyer pay more?',
      answer: 'Buyers pay a small service fee on top of your ticket price. This covers platform costs and ensures you get 100% of your ticket price.'
    },
    {
      question: 'Do I need to pay before using PASA?',
      answer: 'No! PASA is completely free to start. You only pay when you successfully sell tickets.'
    },
    {
      question: 'How fast are payout withdrawals?',
      answer: 'Payouts are processed within 24-48 hours after your event ends. We support MPesa and bank transfers.'
    },
    {
      question: 'Can I use PASA for private events?',
      answer: 'Yes! PASA supports both public and private events with guestlist management and invite-only access.'
    },
    {
      question: 'What payment methods do you support?',
      answer: 'We support MPesa, card payments, and bank transfers. MPesa is our primary and most popular payment method.'
    }
  ]

  const trustBadges = [
    { text: 'Secure Checkout', icon: Shield },
    { text: 'Encrypted QR Codes', icon: Zap },
    { text: 'MPesa Verified', icon: CreditCard },
    { text: '24/7 Support', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}


      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-display font-bold text-charcoal-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Clear. Fair. Transparent.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-charcoal-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hosting should make YOU money — not cost you money.
          </motion.p>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Calculator */}
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-soft border border-primary-200"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-display font-bold text-charcoal-900">
                  Pricing Simulator
                </h2>
              </div>

              <div className="space-y-6">
                {/* Ticket Price */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Ticket Price (KES)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.ticketPrice}
                    onChange={(e) => setCalculatorData({ ...calculatorData, ticketPrice: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>

                {/* Tickets Sold */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Number of Tickets Sold
                  </label>
                  <input
                    type="number"
                    value={calculatorData.ticketsSold}
                    onChange={(e) => setCalculatorData({ ...calculatorData, ticketsSold: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>

                {/* Service Fee Model */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Service Fee Model
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setCalculatorData({ ...calculatorData, serviceFeeModel: 'flat' })}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        calculatorData.serviceFeeModel === 'flat'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-primary-300 hover:border-primary-400'
                      }`}
                    >
                      Flat Fee
                    </button>
                    <button
                      onClick={() => setCalculatorData({ ...calculatorData, serviceFeeModel: 'percentage' })}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        calculatorData.serviceFeeModel === 'percentage'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-primary-300 hover:border-primary-400'
                      }`}
                    >
                      Percentage
                    </button>
                  </div>
                </div>

                {/* Service Fee Value */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    Service Fee {calculatorData.serviceFeeModel === 'flat' ? '(KES per ticket)' : '(%)'}
                  </label>
                  <input
                    type="number"
                    value={calculatorData.serviceFeeValue}
                    onChange={(e) => setCalculatorData({ ...calculatorData, serviceFeeValue: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-primary-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                </div>

                {/* MPesa Fee Mode */}
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-2">
                    MPesa Fee Handling
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setCalculatorData({ ...calculatorData, mpesaFeeMode: 'included' })}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        calculatorData.mpesaFeeMode === 'included'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-primary-300 hover:border-primary-400'
                      }`}
                    >
                      Included
                    </button>
                    <button
                      onClick={() => setCalculatorData({ ...calculatorData, mpesaFeeMode: 'pass-through' })}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        calculatorData.mpesaFeeMode === 'pass-through'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-primary-300 hover:border-primary-400'
                      }`}
                    >
                      Pass-through
                    </button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200">
                <h3 className="font-semibold text-green-800 mb-4">Simulation Results</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Buyer Pays (per ticket):</span>
                    <span className="font-semibold">KES {results.buyerPaysPerTicket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Host Receives (total):</span>
                    <span className="font-semibold text-green-600">KES {results.totalHostReceives}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">PASA Earns (total):</span>
                    <span className="font-semibold">KES {results.pasaEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Payment Processor Fees:</span>
                    <span className="font-semibold">KES {results.totalMpesaFees}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs text-charcoal-500 space-y-1">
                <p>💡 PASA only earns when you earn.</p>
                <p>💡 Zero upfront cost.</p>
                <p>💡 Transparent to you & your attendees.</p>
              </div>
            </motion.div>

            {/* Right Side Content */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-primary-100 rounded-3xl p-8 border border-green-200"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-4">
                Built for African Creators
              </h2>
              <p className="text-lg text-charcoal-600 mb-6">
                PASA is built for creators, DJs, churches, promoters, planners, and visionaries. 
                You focus on the event. We handle payments, tickets, QR scans, and analytics.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-charcoal-700">MPesa-first payments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-charcoal-700">Instant QR ticket generation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-charcoal-700">Real-time analytics dashboard</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-charcoal-700">24/7 customer support</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-2xl border border-primary-200">
                <h3 className="font-semibold text-charcoal-900 mb-2">Ready to get started?</h3>
                <p className="text-charcoal-600 mb-4">Join thousands of hosts who trust PASA with their events.</p>
                <Link
                  to="/signup"
                  className="inline-block bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors font-semibold text-center w-full"
                >
                  Start for Free
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    
    

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-charcoal-600">
              Everything you need to know about PASA pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-white rounded-2xl p-6 border border-primary-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <HelpCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-charcoal-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-8">
              Trusted by Event Hosts Across Africa
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <badge.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-sm font-medium text-charcoal-700">{badge.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/signup"
                className="inline-block bg-green-500 text-white px-12 py-4 rounded-full hover:bg-green-600 transition-colors font-semibold text-lg"
              >
                Start for Free — Join the Waitlist
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing