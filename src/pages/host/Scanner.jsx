// src/pages/host/Scanner.jsx
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, CheckCircle, XCircle, User, Ticket } from 'lucide-react'

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
          tier: 'General Admission',
          buyer: 'John Doe',
          email: 'john@example.com',
          checkedInAt: new Date().toISOString()
        }
      },
      {
        valid: false,
        error: 'QR code already used'
      }
    ]
    
    const result = Math.random() > 0.3 ? results[0] : results[1]
    setScanResult(result)
    
    // Auto-clear result after 3 seconds
    setTimeout(() => {
      setScanResult(null)
    }, 3000)
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
            QR Code Scanner
          </h1>
          <p className="text-xl text-charcoal-600">
            Scan attendee tickets for fast entry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">
              Camera Scanner
            </h2>

            {/* Camera Feed */}
            <div className="relative aspect-square bg-charcoal-900 rounded-2xl overflow-hidden mb-4">
              {isScanning ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <Camera className="w-16 h-16 opacity-50" />
                </div>
              )}
              
              {/* Scanner Overlay */}
              {isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-accent-500 rounded-xl relative">
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-accent-500" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-accent-500" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-accent-500" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-accent-500" />
                  </div>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="flex space-x-4">
              {!isScanning ? (
                <button
                  onClick={startCamera}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <Camera className="w-5 h-5" />
                  <span>Start Camera</span>
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>Stop Camera</span>
                </button>
              )}
              
              {/* Simulate Scan Button for Development */}
              <button
                onClick={simulateScan}
                className="flex-1 btn-secondary"
              >
                Simulate Scan
              </button>
            </div>

            {cameraError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                {cameraError}
              </div>
            )}
          </motion.div>

          {/* Scan Results */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">
              Scan Results
            </h2>

            {scanResult ? (
              <motion.div
                className={`p-6 rounded-2xl ${
                  scanResult.valid 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="text-center mb-4">
                  {scanResult.valid ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  )}
                  
                  <h3 className={`text-xl font-semibold mb-2 ${
                    scanResult.valid ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {scanResult.valid ? 'Valid Ticket' : 'Invalid Ticket'}
                  </h3>
                  
                  <p className={scanResult.valid ? 'text-green-700' : 'text-red-700'}>
                    {scanResult.valid ? 'Entry granted' : scanResult.error}
                  </p>
                </div>

                {scanResult.valid && scanResult.ticket && (
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <Ticket className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-semibold text-charcoal-900">
                          {scanResult.ticket.event}
                        </p>
                        <p className="text-charcoal-600">{scanResult.ticket.tier}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-semibold text-charcoal-900">
                          {scanResult.ticket.buyer}
                        </p>
                        <p className="text-charcoal-600">{scanResult.ticket.email}</p>
                      </div>
                    </div>
                    
                    <div className="text-xs text-charcoal-500">
                      Checked in at {new Date(scanResult.ticket.checkedInAt).toLocaleString()}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-center py-12 text-charcoal-500">
                <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Scan a QR code to see results here</p>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-primary-100 rounded-xl">
              <h4 className="font-semibold text-charcoal-900 mb-2">
                Scanning Tips
              </h4>
              <ul className="text-sm text-charcoal-600 space-y-1">
                <li>• Ensure good lighting conditions</li>
                <li>• Hold steady 6-12 inches from the code</li>
                <li>• Position QR code within the frame</li>
                <li>• Ask attendees to maximize screen brightness</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HostScanner