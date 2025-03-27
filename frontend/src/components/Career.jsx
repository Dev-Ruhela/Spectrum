import { Button } from '../components/ui/button'
import { motion } from 'framer-motion'
import Chatbot from './Chatbot'
import FloatingChatbot from './FloatingChatbot'

export default function Career() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }

  const upskills = [
    {
      title: 'Web Development',
      description: 'Learn the latest web technologies and frameworks.',
      image: '/images/web-development.jpg', // Replace with your image URLs
    },
    {
      title: 'Digital Marketing',
      description: 'Master the art of online marketing and SEO.',
      image: '/images/digital-marketing.jpg',
    },
    {
      title: 'Data Science',
      description: 'Dive into the world of data analysis and machine learning.',
      image: '/images/data-science.jpg',
    },
  ]

  const webinars = [
    {
      date: 'June 15, 2023',
      topic: 'Navigating the Tech Industry as an LGBTQ+ Professional',
      image: '/images/webinar1.jpg',
    },
    {
      date: 'June 22, 2023',
      topic: 'Building Inclusive Workplaces: A Panel Discussion',
      image: '/images/webinar2.jpg',
    },
    {
      date: 'June 29, 2023',
      topic: 'Career Transitions: Finding Your Path in a New Field',
      image: '/images/webinar3.jpg',
    },
  ]

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-poppins">
      
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 bg-white shadow-md z-50">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          LGBTQ+ Empower
        </div>
        <FloatingChatbot />
        <nav className="flex space-x-6 text-gray-800 font-medium items-center">
          <a
            href="/career"
            className="hover:text-pink-500 transition-all duration-200"
          >
            Career
          </a>
          <a
            href="/events"
            className="hover:text-pink-500 transition-all duration-200"
          >
            Events
          </a>
          <a
            href="/ngo-locator"
            className="hover:text-pink-500 transition-all duration-200"
          >
            NGO Locator
          </a>
          <a
            href="/donate"
            className="bg-pink-500 px-4 py-2 rounded-full text-white font-semibold hover:bg-pink-600 transition-all duration-200"
          >
            Donate
          </a>
        </nav>
      </header>

      <motion.div
        className="container mx-auto px-4 py-28"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1
          className="text-7xl font-extralight mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
          variants={fadeInUpVariants}
        >
          Career Empowerment
        </motion.h1>

        {/* Upskilling Portal */}
        <motion.section className="mb-16" variants={staggerContainer}>
          <motion.h2
            className="text-3xl font-bold mb-6 text-center text-purple-600"
            variants={fadeInUpVariants}
          >
            Upskilling Portal
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Web Development',
                description:
                  'Learn the latest web technologies and frameworks.',
              },
              {
                title: 'Digital Marketing',
                description: 'Master the art of online marketing and SEO.',
              },
              {
                title: 'Data Science',
                description:
                  'Dive into the world of data analysis and machine learning.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-purple-500"
                variants={fadeInUpVariants}
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-600 hover:bg-purple-50"
                >
                  Enroll Now
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Webinars */}
        <motion.section className="mb-16" variants={staggerContainer}>
          <motion.h2
            className="text-3xl font-bold mb-6 text-center text-purple-600"
            variants={fadeInUpVariants}
          >
            Webinars
          </motion.h2>
          <div className="space-y-8">
            {webinars.map((webinar, index) => (
              <motion.div
                key={index}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-center bg-white rounded-lg shadow-lg overflow-hidden`}
                variants={fadeInUpVariants}
              >
                <img
                  src={webinar.image}
                  alt={webinar.topic}
                  className="md:w-1/2 h-60 object-cover"
                />
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {webinar.topic}
                  </h3>
                  <p className="text-gray-600 mb-4 font-medium">
                    Date: {webinar.date}
                  </p>
                  <Button className="bg-purple-500 text-white hover:bg-purple-600">
                    Register Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
      
    </div>
    
    </>
  )
}
