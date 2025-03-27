import React, { useState, useEffect } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight, ArrowDown ,Users, Briefcase, GraduationCap, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import Career from './Career';
import Header from './Header';
import Footer from './Footer';
import { useAuthStore } from '../../firebase';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import LottieAnimation1 from '../animations/LottieAnimation1';
import LottieAnimation from '../animations/LottieAnimation';
import LottieAnimation2 from '../animations/LottieAnimation2';
import LottieAnimation3 from '../animations/LotteAnimation3';
import toast from 'react-hot-toast';



const HomePage = () => {
  
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const {signIn} = useAuthStore();
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const {user , isAuthenticated} = useAuthStore();
  const [storyIndex, setStoryIndex] = useState(0);
  const [visiblePartners, setVisiblePartners] = useState([]);
  const [fadeState, setFadeState] = useState('in');
  const [isVisible, setIsVisible] = useState(false);
  const { partners, fetchPartners } = useAuthStore();
  useEffect(() => {
      fetchPartners(); 
      
    }, [fetchPartners]);

  useEffect(() => {
    // Set visible after a short delay for entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      icon: Users,
      title: "Universal Access",
      description: "Creating pathways to employment for everyone, everywhere"
    },
    {
      icon: Briefcase,
      title: "Job Matching",
      description: "Connecting unique skills to meaningful career opportunities"
    },
    {
      icon: GraduationCap,
      title: "Education Pathways",
      description: "Linking individuals to relevant learning opportunities"
    },
    {
      icon: LineChart,
      title: "Sustainable Careers",
      description: "Building foundations for long-term professional growth"
    }
  ];
  

  const itemsPerView = 4;
  const totalSets = Math.ceil(partners.length / itemsPerView);
  const [currentSet, setCurrentSet] = useState(0);

  // Handle rotation of partners with fade effect
  const rotatePartners = (direction) => {
    setFadeState('out');
    
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentSet((prev) => (prev + 1) % totalSets);
      } else {
        setCurrentSet((prev) => (prev - 1 + totalSets) % totalSets);
      }
      setFadeState('in');
    }, 300);
  };

  // Update visible partners when currentSet changes
  useEffect(() => {
    const startIdx = currentSet * itemsPerView;
    const endIdx = Math.min(startIdx + itemsPerView, partners.length);
    setVisiblePartners(partners.slice(startIdx, endIdx));
  }, [currentSet]);
  const stories = [
    {
      name: "Alex Rivera",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "From intern to Tech Lead at Google",
      quote:
        "This platform provided me with the mentorship and resources I needed to succeed in tech.",
    },
    {
      name: "Sarah Chen",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      role: "Founder of InnovateTech Solutions",
      quote:
        "The community here helped me build my confidence and launch my own company.",
    },
    {
      name: "Jordan Taylor",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
      role: "VP of Design at Microsoft",
      quote:
        "Found incredible mentors who guided me through my career journey.",
    },
    {
      name: "Taylor Smith",
      image: "https://randomuser.me/api/portraits/women/78.jpg",
      role: "Product Designer at Tesla",
      quote:
        "This platform helped me connect with like-minded professionals to elevate my career.",
    },
  ];
  



  const handleNext = () => {
    if (storyIndex < stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    }
  };

  const handlePrev = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    }
  };
  useEffect(() => {
    AOS.init({ duration: 1400 });
  }, []);
  useEffect(() => {
  
  }, [])
  // useEffect(() => {
  //   // Check if splash screen has been shown before
  //   const splashShown = localStorage.getItem('splashShown');

  //   if (!splashShown) {
  //     const timer = setTimeout(() => {
  //       setIsSplashComplete(true);
  //       localStorage.setItem('splashShown', 'true'); // Mark splash as shown
  //     }, 3000); // Splash screen duration (adjust as needed)

  //     return () => clearTimeout(timer);
  //   } else {
  //     setIsSplashComplete(true); // Skip splash if already shown
  //   }
  // }, []);

  const handleLogin = async () => {
    try {
      await signIn();
      toast.success("signin success")
    }
    catch (error) {
      throw error;
    }
  }

  // Pride flag colors for gradient animations
  const prideColors = [
    'rgb(255, 0, 24)',   // Red
    'rgb(255, 160, 0)',  // Orange
    'rgb(255, 240, 0)',  // Yellow
    'rgb(0, 128, 24)',   // Green
    'rgb(0, 0, 255)',    // Blue
    'rgb(128, 0, 128)'   // Purple
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quotes = [
    {
      text: "Equality means more than passing laws. The struggle is really won in the hearts and minds of the community.",
      author: "Harvey Milk"
    },
    {
      text: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde"
    },
    {
      text: "Every person has the right to live authentically and proudly.",
      author: "Laverne Cox"
    }
  ];

  const successStories = [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      company: "Tech Leader Corp",
      story: "From struggling to find acceptance to becoming a successful software engineer through our career counseling and upskilling program.",
      image: "/api/placeholder/400/400"
    }
  ];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
    setFeedback('');
    setRating(0);
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const rainbowGradientStyle = {
    background: `linear-gradient(45deg, ${prideColors.join(', ')})`,
    backgroundSize: '400% 400%',
    animation: 'gradient 15s ease infinite'
  };

  return (
    <>
    
    <div className="min-h-screen ">
      <Header />
      {/* Hero Section with Rainbow Animation */}
      <motion.section 
  className="relative h-screen flex items-center justify-center text-white overflow-hidden"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  {/* Header Section */}
  

  {/* Background Image with Blur */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('image copy.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(2px)",
    }}
  />
  
  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-900/30 " />
  
  {/* Content */}
  <motion.div 
    className="relative z-10 text-center px-4 space-y-8"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.8 }}
  >
    <div className="text-7xl font-normal bg-clip-text py-2 text-transparent bg-gradient-to-r from-pink-400 via-blue-400 to-violet-400">
      <div className='mb-4'>Empowering the LGBTQ+ Community</div>
    </div>
    <p className="text-2xl text-white max-w-3xl mx-auto">
      Upskilling, connecting, and transforming lives with career opportunities, counseling, and support.
    </p>
    <div className="space-x-4">
      
      {!isAuthenticated ? (
        <motion.button 
        className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogin}
      >
        Join Us
      </motion.button>
      ) : (
        <Link
      to="/courses"
      >
      <motion.button 

        className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore Opportunities
      </motion.button>
      </Link>
      )}
      
    </div>
  </motion.div>
  
  {/* Arrow Down Animation */}
  <motion.div 
    className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 1.5 }}
  >
    <ArrowDown className="w-8 h-8 text-white" />
  </motion.div>
</motion.section>

<section className="py-20 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className=" max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16"
        data-aos="fade-up"
        >
          Our Partners
        </h2>
        
        
        <div className="relative">
          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          data-aos="fade-up"
          >
            {partners.map((partner,index) => (
              <div
                key={index}
                className={`transform transition-all duration-300 ${
                  fadeState === 'in' 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <Link
                to={partner.link}
                target="_blank"
                >
                <div className="bg-white rounded-lg p-8 text-center group text-gray-800 hover:bg-gray-50 transition-all duration-300 shadow-xl hover:text-blue-500">
                  <div className=" flex items-center justify-center overflow-hidden rounded-full mx-auto mb-6"
                
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
              
                      className="w-24 h-24 object-contain transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-normal text-xl">
                    {partner.name}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:origin-left group-hover:scale-x-100 group-hover:opacity-100 origin-right scale-x-0 opacity-0"></span>

                  </h3>
                </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Controls
          <div className="flex justify-between mt-8">
            <button
              onClick={() => rotatePartners('prev')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                currentSet === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
              disabled={currentSet === 0}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalSets)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setFadeState('out');
                    setTimeout(() => {
                      setCurrentSet(idx);
                      setFadeState('in');
                    }, 300);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSet === idx
                      ? 'bg-gray-800 scale-110'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => rotatePartners('next')}
              className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                currentSet === totalSets - 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-800 hover:bg-gray-200'
              }`}
              disabled={currentSet === totalSets - 1}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div> */}
        </div>
      </div>
    </section>
      {/* Mission Statement with Interactive Cards */}
      <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 ">
      <div className="relative flex items-center justify-center mb-16"
      data-aos="fade-up" // AOS animation
      >
      <div className="absolute -left-64 -top-36">
    <LottieAnimation1 />
  </div>
  <h2 className="text-4xl font-extrabold text-gray-800 text-center"
  data-aos="fade-up">
    Success Stories
  </h2>
  <div className="absolute  -right-64 -top-36"
  data-aos="fade-up" // AOS animation
  >
    <LottieAnimation1 />
  </div>
</div>

        
        <div className="relative overflow-hidden"
        data-aos = "fade-left"
        >
          <div className="relative w-full">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${storyIndex * 100}%)` }}
              data-aos="fade-up"
            >
              {stories.map((story, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <div className="bg-white shadow-lg hover:shadow-xl rounded-lg p-6 mx-4 text-center">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-32 h-32 mx-auto rounded-full mb-6 object-cover"
                    />
                    <h3 className="font-semibold text-xl text-gray-800">
                      {story.name}
                    </h3>
                    <p className="text-sm text-gray-500 italic mb-4">
                      {story.role}
                    </p>
                    <p className="text-gray-700">
                      {story.quote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

            <button
            className={`absolute left-6 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 transition-opacity duration-300 ${
              storyIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-700'
            }`}
            onClick={handlePrev}
            disabled={storyIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className={`absolute right-6 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 transition-opacity duration-300 ${
              storyIndex === stories.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-700'
            }`}
            onClick={handleNext}
            disabled={storyIndex === stories.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 gap-2">
          {stories.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === storyIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
              onClick={() => setStoryIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
    <section className="py-24 bg-gradient-to-b from-white to-gray-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className={`transition-all duration-1000 transform relative ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        data-aos="fade-up"
        data-aos-delay="200">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            Why We Do This
          </h2>
          <div className="absolute  -right-36 -top-36"
            data-aos="fade-up" // AOS animation
            data-aos-delay="500" // Delay before animation starts
            data-aos-offset="100">
              <LottieAnimation2 />
            </div>
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-xl text-center text-gray-600 font-medium mb-8">
              We believe that every single person in the world deserves a pathway to employment.
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
              <p className="text-lg text-gray-700 leading-relaxed">
                Pride Connect equips employment and career services with technology and support that identifies people's unique skills to connect them to jobs and education. The impact is access to sustainable career pathways and improved livelihoods.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-700 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-xl p-6 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
      {/* Partners Section */}
      
      {/* Feedback Section */}
      <section className="py-16 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="relative max-w-3xl mx-auto px-4"
        data-aos="fade-up"
        data-aosdelay="500"
        >
        <div className="absolute -left-96 -top-40"
            data-aos="fade-up" // AOS animation
            data-aos-delay="500" // Delay before animation starts
            data-aos-offset="100">
              <LottieAnimation3 />
            </div>
          <h2 className="text-3xl font-bold text-center mb-8">Share Your Feedback</h2>
          <form className="bg-white shadow-lg rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Your Experience</label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white py-3 px-6 rounded-lg font-light w-full"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
          
    </>
  );
}

export default HomePage;