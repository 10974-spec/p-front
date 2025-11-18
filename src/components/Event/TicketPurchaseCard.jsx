// src/components/Event/TicketPurchaseCard.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Ticket, Users } from 'lucide-react'

const TicketPurchaseCard = ({ event }) => {
  const [selectedTier, setSelectedTier] = useState(event.ticketTiers?.[0]?.tierId || '')
  const [quantity, setQuantity] = useState(1)
  const [showTiers, setShowTiers] = useState(false)

  const selectedTierData = event.ticketTiers?.find(tier => tier.tierId === selectedTier)
  const totalPrice = selectedTierData ? (selectedTierData.price * quantity) / 100 : 0

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (selectedTierData?.remainingQty || 1)) {
      setQuantity(newQuantity)
    }
  }

  return (
    <motion.div
      className="card p-6 sticky top-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="space-y-6">
        {/* Price */}
        <div className="text-center">
          <span className="text-3xl font-bold text-charcoal-900">
            ${selectedTierData ? (selectedTierData.price / 100) : '0'}
          </span>
          <span className="text-charcoal-600 ml-2">per ticket</span>
        </div>

        {/* Ticket Tier Selection */}
        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-between p-4 border border-primary-300 rounded-xl hover:border-accent-500 transition-colors"
            onClick={() => setShowTiers(!showTiers)}
          >
            <div className="text-left">
              <p className="font-semibold text-charcoal-900">
                {selectedTierData?.name || 'Select Ticket Type'}
              </p>
              <p className="text-sm text-charcoal-600">
                {selectedTierData?.remainingQty || 0} tickets left
              </p>
            </div>
            {showTiers ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {/* Ticket Tiers Dropdown */}
          {showTiers && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {event.ticketTiers?.map((tier) => (
                <button
                  key={tier.tierId}
                  className={`w-full text-left p-3 rounded-xl transition-all ${
                    selectedTier === tier.tierId
                      ? 'bg-accent-500 text-white'
                      : 'bg-primary-100 hover:bg-primary-200'
                  }`}
                  onClick={() => {
                    setSelectedTier(tier.tierId)
                    setShowTiers(false)
                    setQuantity(1)
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tier.name}</span>
                    <span>${tier.price / 100}</span>
                  </div>
                  <div className="text-sm opacity-80">
                    {tier.remainingQty} tickets left
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Quantity Selector */}
        {selectedTier && (
          <div className="space-y-3">
            <label className="font-medium text-charcoal-900">Quantity</label>
            <div className="flex items-center justify-between p-4 border border-primary-300 rounded-xl">
              <button
                className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center hover:bg-primary-300 transition-colors disabled:opacity-50"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <span className="text-lg">-</span>
              </button>
              
              <span className="text-xl font-semibold">{quantity}</span>
              
              <button
                className="w-8 h-8 rounded-full bg-primary-200 flex items-center justify-center hover:bg-primary-300 transition-colors disabled:opacity-50"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= (selectedTierData?.remainingQty || 1)}
              >
                <span className="text-lg">+</span>
              </button>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        {selectedTier && (
          <div className="space-y-2 pt-4 border-t border-primary-200">
            <div className="flex justify-between text-charcoal-600">
              <span>{quantity} × ${selectedTierData.price / 100}</span>
              <span>${(selectedTierData.price * quantity) / 100}</span>
            </div>
            <div className="flex justify-between text-charcoal-600">
              <span>Service fee</span>
              <span>$2.00</span>
            </div>
            <div className="flex justify-between text-charcoal-600">
              <span>Processing fee</span>
              <span>$1.50</span>
            </div>
            <div className="flex justify-between font-semibold text-lg text-charcoal-900 pt-2 border-t border-primary-200">
              <span>Total</span>
              <span>${totalPrice + 3.50}</span>
            </div>
          </div>
        )}

        {/* Buy Button */}
        <Link
          to={`/checkout/${event._id}?tier=${selectedTier}&quantity=${quantity}`}
          className={`w-full py-4 rounded-xl font-semibold text-center transition-all ${
            selectedTier
              ? 'btn-primary animate-bounce-soft'
              : 'bg-primary-200 text-charcoal-500 cursor-not-allowed'
          }`}
        >
          <Ticket className="w-5 h-5 inline mr-2" />
          {selectedTier ? 'Get Tickets' : 'Select Ticket Type'}
        </Link>

        {/* Remaining Tickets */}
        {selectedTierData && (
          <div className="text-center text-sm text-charcoal-600 flex items-center justify-center space-x-1">
            <Users className="w-4 h-4" />
            <span>Only {selectedTierData.remainingQty} tickets left</span>
          </div>
        )}

        {/* Security Badge */}
        <div className="text-center text-xs text-charcoal-500">
          🔒 Secure checkout • Instant confirmation
        </div>
      </div>
    </motion.div>
  )
}

export default TicketPurchaseCard