// src/components/Layout/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="glass mt-20 border-t border-primary-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
                       <img 
    src="/src/assets/logo.png" 
    alt="PASA Logo" 
    className="size-24  object-cover" 
  />
            </Link>
            <p className="text-charcoal-600 text-sm leading-relaxed">
              Create, share, and sell tickets — all in one link. The next-generation event ticketing platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-charcoal-900 mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/events" className="hover:text-accent-500 transition-colors">Browse Events</Link></li>
              <li><Link to="/host" className="hover:text-accent-500 transition-colors">Host Dashboard</Link></li>
              <li><Link to="/pricing" className="hover:text-accent-500 transition-colors">Pricing</Link></li>
              <li><Link to="/waitlist" className="hover:text-accent-500 transition-colors">Waitlist</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-charcoal-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/help" className="hover:text-accent-500 transition-colors">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-accent-500 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-accent-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-charcoal-900 mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-charcoal-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@pasa.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-200 mt-8 pt-8 text-center">
          <p className="text-charcoal-500 text-sm">
            © 2024 PASA. All rights reserved. Crafted with ❤️ for event creators and attendees.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer