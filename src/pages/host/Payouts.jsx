// src/pages/host/Payouts.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

const HostPayouts = () => {
  const payoutStats = {
    availableBalance: 12580,
    pendingPayouts: 2340,
    totalEarnings: 49200
  }

  const payouts = [
    {
      id: 1,
      amount: 8500,
      status: 'completed',
      method: 'bank',
      date: '2024-06-01T10:00:00Z',
      reference: 'BANK_123456'
    },
    {
      id: 2,
      amount: 4080,
      status: 'processing',
      method: 'mpesa',
      date: '2024-07-15T14:30:00Z',
      reference: 'MPESA_789012'
    },
    {
      id: 3,
      amount: 2340,
      status: 'pending',
      method: 'bank',
      date: '2024-08-20T09:00:00Z',
      reference: null
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'processing':
        return 'Processing'
      case 'pending':
        return 'Pending'
      default:
        return status
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount / 100)
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
            Payouts
          </h1>
          <p className="text-xl text-charcoal-600">
            Manage your earnings and payout requests
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-charcoal-900 mb-1">
              {formatAmount(payoutStats.availableBalance)}
            </p>
            <p className="text-charcoal-600 text-sm">Available Balance</p>
          </motion.div>

          <motion.div
            className="card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-charcoal-900 mb-1">
              {formatAmount(payoutStats.pendingPayouts)}
            </p>
            <p className="text-charcoal-600 text-sm">Pending Payouts</p>
          </motion.div>

          <motion.div
            className="card p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-charcoal-900 mb-1">
              {formatAmount(payoutStats.totalEarnings)}
            </p>
            <p className="text-charcoal-600 text-sm">Total Earnings</p>
          </motion.div>
        </div>

        {/* Payouts List */}
        <motion.div
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-charcoal-900">
              Payout History
            </h2>
            <button className="btn-primary">
              Request Payout
            </button>
          </div>

          <div className="space-y-4">
            {payouts.map((payout) => (
              <div
                key={payout.id}
                className="flex items-center justify-between p-4 bg-primary-100 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  {getStatusIcon(payout.status)}
                  <div>
                    <p className="font-semibold text-charcoal-900">
                      {formatAmount(payout.amount)}
                    </p>
                    <p className="text-sm text-charcoal-600">
                      {payout.method.toUpperCase()} • {format(new Date(payout.date), 'MMM dd, yyyy')}
                    </p>
                    {payout.reference && (
                      <p className="text-xs text-charcoal-500">
                        Ref: {payout.reference}
                      </p>
                    )}
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                  {getStatusText(payout.status)}
                </span>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {payouts.length === 0 && (
            <div className="text-center py-12 text-charcoal-500">
              <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No payout history yet</p>
            </div>
          )}
        </motion.div>

        {/* Payout Information */}
        <motion.div
          className="card p-6 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-charcoal-900 mb-4">
            Payout Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-charcoal-600">
            <div>
              <h4 className="font-semibold text-charcoal-900 mb-2">Processing Time</h4>
              <ul className="space-y-1">
                <li>• Bank transfers: 3-5 business days</li>
                <li>• M-Pesa: Instant to 24 hours</li>
                <li>• Minimum payout: $10.00</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-charcoal-900 mb-2">Payout Schedule</h4>
              <ul className="space-y-1">
                <li>• Available balance updated daily</li>
                <li>• Payouts processed weekly</li>
                <li>• Manual requests available anytime</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HostPayouts