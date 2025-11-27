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
  CreditCard,
  ArrowRight,
  PieChart,
  DollarSign,
  Target
} from 'lucide-react'

const Pricing = () => {
  const [calculatorData, setCalculatorData] = useState({
    ticketPrice: 1000,
    ticketsSold: 50,
    serviceFeeModel: 'flat',
    serviceFeeValue: 30,
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
    const mpesaFeePerTransaction = Math.max(12, ticketPrice * 0.012)
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
      totalMpesaFees: Math.round(totalMpesaFees),
      totalTicketRevenue: Math.round(totalTicketRevenue)
    }
  }

  const results = calculateResults()

  const valueProps = [
    {
      icon: DollarSign,
      title: 'No Monthly Fees',
      description: 'Pay only when you sell tickets. No subscriptions, no hidden costs.'
    },
    {
      icon: Shield,
      title: 'Transparent Pricing',
      description: 'Know exactly what you earn and what buyers pay. No surprises.'
    },
    {
      icon: TrendingUp,
      title: 'Maximize Your Revenue',
      description: 'Keep 100% of your ticket price. We only charge a small service fee.'
    },
    {
      icon: Smartphone,
      title: 'MPesa Optimized',
      description: 'Built for Kenyan payments with instant MPesa integration.'
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
    }
  ]

  const trustBadges = [
    { text: 'Secure Payments', icon: Shield },
    { text: 'Instant Payouts', icon: Zap },
    { text: 'MPesa Verified', icon: CreditCard },
    { text: '24/7 Support', icon: Users }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4" />
              <span>Transparent Pricing</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-charcoal-900 mb-6 leading-tight">
              Fair Pricing for
              <span className="text-red-600"> African Creators</span>
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              You keep 100% of your ticket price. We only charge a small service fee when you make sales.
            </p>
          </motion.div>

          {/* Value Props Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {valueProps.map((prop, index) => (
              <div
                key={prop.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                  <prop.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-charcoal-900 mb-2 text-lg">
                  {prop.title}
                </h3>
                <p className="text-charcoal-600 text-sm leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
              See Exactly What You'll Earn
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Use our calculator to understand your earnings with complete transparency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Inputs */}
            <motion.div
              className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-soft border border-red-100"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-charcoal-900">
                    Revenue Calculator
                  </h3>
                  <p className="text-charcoal-600">Adjust the sliders to see your earnings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ticket Price */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-charcoal-700">
                    Ticket Price (KES)
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="100"
                    value={calculatorData.ticketPrice}
                    onChange={(e) => setCalculatorData({ ...calculatorData, ticketPrice: Number(e.target.value) })}
                    className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-charcoal-600">
                    <span>100</span>
                    <span className="font-semibold text-red-600">{calculatorData.ticketPrice} KES</span>
                    <span>10,000</span>
                  </div>
                </div>

                {/* Tickets Sold */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-charcoal-700">
                    Tickets Sold
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={calculatorData.ticketsSold}
                    onChange={(e) => setCalculatorData({ ...calculatorData, ticketsSold: Number(e.target.value) })}
                    className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-charcoal-600">
                    <span>10</span>
                    <span className="font-semibold text-red-600">{calculatorData.ticketsSold} tickets</span>
                    <span>1000</span>
                  </div>
                </div>

                {/* Service Fee Model */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-charcoal-700">
                    Service Fee Model
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCalculatorData({ ...calculatorData, serviceFeeModel: 'flat' })}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        calculatorData.serviceFeeModel === 'flat'
                          ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      Flat Fee
                    </button>
                    <button
                      onClick={() => setCalculatorData({ ...calculatorData, serviceFeeModel: 'percentage' })}
                      className={`px-4 py-3 rounded-xl border-2 transition-all ${
                        calculatorData.serviceFeeModel === 'percentage'
                          ? 'border-red-500 bg-red-50 text-red-700 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      Percentage
                    </button>
                  </div>
                </div>

                {/* Service Fee Value */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-charcoal-700">
                    Service Fee {calculatorData.serviceFeeModel === 'flat' ? '(KES)' : '(%)'}
                  </label>
                  <input
                    type="number"
                    value={calculatorData.serviceFeeValue}
                    onChange={(e) => setCalculatorData({ ...calculatorData, serviceFeeValue: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
                  />
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-8 text-white shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold mb-6">Your Earnings</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-100">You Receive</span>
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold">KES {results.totalHostReceives}</div>
                  <div className="text-red-200 text-sm mt-1">Total earnings after fees</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-red-100">Ticket Revenue</span>
                    <span className="font-semibold">KES {results.totalTicketRevenue}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-red-100">Service Fee</span>
                    <span className="font-semibold">- KES {results.pasaEarnings}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-red-100">Payment Fees</span>
                    <span className="font-semibold">- KES {results.totalMpesaFees}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold">Buyer Pays (per ticket)</span>
                    <span className="font-bold">KES {results.buyerPaysPerTicket}</span>
                  </div>
                </div>

                <Link
                  to="/signup"
                  className="block w-full bg-white text-red-600 text-center py-4 rounded-xl font-semibold hover:bg-red-50 transition-all duration-200 mt-6 shadow-lg"
                >
                  Start Selling Tickets
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
              Common Questions
            </h2>
            <p className="text-xl text-charcoal-600">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-red-50 rounded-2xl p-6 border border-red-200 hover:border-red-300 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal-900 mb-3 text-lg">
                      {faq.question}
                    </h3>
                    <p className="text-charcoal-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-charcoal-900 to-charcoal-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              <span>Join Thousands of Hosts</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Start Selling Tickets?
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join PASA today and start creating unforgettable events with our powerful ticketing platform.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-3">
                    <badge.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">{badge.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/signup"
                className="inline-flex items-center justify-center bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Start for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-white/10 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-200 font-semibold text-lg backdrop-blur-sm"
              >
                Contact Sales
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Pricing