import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import SearchModal from './SearchModal'

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="relative">
      {/* Compact Search Bar */}
      <motion.div
        className="search-bar-glass px-6 py-4 cursor-pointer rounded-full border border-white/20 backdrop-blur-xl"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <Search className="w-5 h-5 text-charcoal-500" />
            <div>
              <p className="text-lg font-medium text-charcoal-700">Find amazing events</p>
              <p className="text-sm text-charcoal-500">Search by location, date, or category</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
        </div>
      </motion.div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default SearchBar