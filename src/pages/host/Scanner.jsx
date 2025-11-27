// src/pages/host/Scanner.jsx
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, CheckCircle, XCircle, User, Ticket, Scan, Lightbulb } from 'lucide-react'

const HostScanner = () => {
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      streamRef.current = stream
      videoRef.current.srcObject = stream
      setIsScanning(true)
      setCameraError(null)
    } catch (error) {
      setCameraError('Unable to access camera. Please check permissions.')
      console.error('Camera error:', error)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      setIsScanning(false)
    }
  }

  const simulateScan = () => {
    // Simulate QR scan result
    const results = [
      {
        valid: true,
        ticket: {
          event: 'Summer Music Festival 2024',
          tier: 'VIP Pass',
          buyer: 'Sarah Johnson',
          email: 'sarah.johnson@example.com',
          checkedInAt: new Date().toISOString()
        }
      },
      {
        valid: false,
        error: 'Ticket already scanned'
      },
      {
        valid: true,
        ticket: {
          event: 'Tech Conference 2024',
          tier: 'General Admission',
          buyer: 'Mike Chen',
          email: 'mike.chen@example.com',
          checkedInAt: new Date().toISOString()
        }
      }
    ]
    
    const result = results[Math.floor(Math.random() * results.length)]
    setScanResult(result)
    
    // Auto-clear result after 5 seconds
    setTimeout(() => {
      setScanResult(null)
    }, 5000)
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-primary-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scan className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
            QR Code Scanner
          </h1>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Quickly scan attendee tickets and manage event entry with our real-time QR code scanner
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <motion.div
            className="bg-white rounded-3xl p-8 border border-red-100 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-charcoal-900">
                  Camera Scanner
                </h2>
                <p className="text-charcoal-600">Real-time QR code detection</p>
              </div>
            </div>

            {/* Camera Feed */}
            <div className="relative aspect-square bg-gradient-to-br from-charcoal-800 to-charcoal-900 rounded-2xl overflow-hidden mb-6 shadow-inner">
              {isScanning ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white/70">
                  <Camera className="w-16 h-16 mb-4 opacity-60" />
                  <p className="text-lg font-medium">Camera inactive</p>
                  <p className="text-sm opacity-80 mt-2">Start camera to begin scanning</p>
                </div>
              )}
              
              {/* Scanner Overlay */}
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-red-400 rounded-xl relative shadow-lg">
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-red-400" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-red-400" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-red-400" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-red-400" />
                    
                    {/* Animated scanning line */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-red-400 rounded-full"
                      initial={{ y: 0 }}
                      animate={{ y: 256 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              {!isScanning ? (
                <button
                  onClick={startCamera}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Camera className="w-5 h-5" />
                  <span>Start Camera</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="flex-1 bg-white border-2 border-charcoal-300 hover:border-charcoal-400 text-charcoal-700 py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-200"
                >
                  <span>Stop Camera</span>
                </button>
              )}
              
              {/* Simulate Scan Button for Development */}
              <button
                onClick={simulateScan}
                className="flex-1 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Test Scan
              </button>
            </div>

            {cameraError && (
              <motion.div 
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {cameraError}
              </motion.div>
            )}
          </motion.div>

          {/* Scan Results */}
          <motion.div
            className="bg-white rounded-3xl p-8 border border-red-100 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-charcoal-900">
                  Scan Results
                </h2>
                <p className="text-charcoal-600">Real-time validation feedback</p>
              </div>
            </div>

            {scanResult ? (
              <motion.div
                className={`p-6 rounded-2xl border-2 ${
                  scanResult.valid 
                    ? 'bg-red-50 border-red-200 shadow-lg' 
                    : 'bg-red-50 border-red-200 shadow-lg'
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-center mb-6">
                  {scanResult.valid ? (
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-red-500" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                  )}
                  
                  <h3 className={`text-2xl font-bold mb-3 ${
                    scanResult.valid ? 'text-red-800' : 'text-red-800'
                  }`}>
                    {scanResult.valid ? 'Valid Ticket!' : 'Invalid Ticket'}
                  </h3>
                  
                  <p className={`text-lg font-medium ${
                    scanResult.valid ? 'text-red-700' : 'text-red-700'
                  }`}>
                    {scanResult.valid ? 'Entry granted successfully' : scanResult.error}
                  </p>
                </div>

                {scanResult.valid && scanResult.ticket && (
                  <div className="space-y-4 bg-white/80 rounded-xl p-4 border border-red-200">
                    <div className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg">
                      <Ticket className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-bold text-charcoal-900 text-lg">
                          {scanResult.ticket.event}
                        </p>
                        <p className="text-red-700 font-medium">{scanResult.ticket.tier}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg">
                      <User className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-bold text-charcoal-900">
                          {scanResult.ticket.buyer}
                        </p>
                        <p className="text-charcoal-600">{scanResult.ticket.email}</p>
                      </div>
                    </div>
                    
                    <div className="text-center text-sm text-charcoal-500 bg-red-25 py-2 rounded-lg border border-red-100">
                      Checked in at {new Date(scanResult.ticket.checkedInAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-12 text-charcoal-500 bg-red-25 rounded-2xl border-2 border-dashed border-red-200">
                <Ticket className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium text-charcoal-700 mb-2">Ready to Scan</p>
                <p className="text-charcoal-600">Scan a QR code to see validation results</p>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-8 p-6 bg-gradient-to-br from-red-50 to-red-25 rounded-2xl border border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-5 h-5 text-red-600" />
                <h4 className="font-bold text-charcoal-900 text-lg">
                  Pro Scanning Tips
                </h4>
              </div>
              <ul className="space-y-3 text-charcoal-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Ensure good lighting for better detection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Hold steady 6-12 inches from the code</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Position QR code within the frame</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Ask attendees to maximize screen brightness</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HostScanner