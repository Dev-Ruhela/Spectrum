'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function NGOLocatorPage() {
  const [location, setLocation] = useState('')
  const [ngos, setNgos] = useState([
    { id: 1, name: "Rainbow Support Network", address: "123 Main St, New York, NY", phone: "(123) 456-7890" },
    { id: 2, name: "LGBTQ+ Youth Center", address: "456 Oak Ave, Los Angeles, CA", phone: "(987) 654-3210" },
    { id: 3, name: "Pride Health Clinic", address: "789 Elm Rd, Chicago, IL", phone: "(456) 789-0123" },
  ])

  const handleSearch = (e) => {
    e.preventDefault()

  }

  return (
    <div className="min-h-screen bg-pink-100">

      {/* Top Section with Background Image */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('ngo.png')" }} // Replace with your actual image path
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <motion.div
          className="relative container mx-auto px-4 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-white shadow-lg z-50">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 flex items-center">
              <div>LGBTQ+ Empower</div>
            </div>
            <nav className="flex space-x-6 items-center text-black">
              <a href="/career" className="font-semibold hover:text-pink-500 transition">Career</a>
              <a href="/events" className="font-semibold hover:text-pink-500 transition">Events</a>
              <a href="/ngo-locator" className="font-semibold hover:text-pink-500 transition">NGO Locator</a>
              <a href="/donate" className="bg-pink-500 px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition">Donate</a>
            </nav>
          </header>

          {/* Page Title */}
          <motion.h1
            className="text-5xl font-light mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 text-center mt-16"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Find LGBTQ+ Friendly NGOs
          </motion.h1>

          {/* Search Section */}
          <motion.form
            onSubmit={handleSearch}
            className="mb-12"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex gap-4 items-center max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-grow rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform">
                Search
              </Button>
            </div>
          </motion.form>
        </motion.div>
      </div>

      {/* NGO Cards Section (Plain Background) */}
      <motion.div
        className="container mx-auto px-4 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {ngos.map((ngo) => (
            <motion.div
              key={ngo.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.03 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h2 className="text-2xl font-bold mb-2 text-purple-600">{ngo.name}</h2>
              <p className="text-gray-600 mb-1">{ngo.address}</p>
              <p className="text-gray-500 mb-4">{ngo.phone}</p>
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                Contact NGO
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
