// components/HeroSection.jsx
import React, { useState , useEffect } from "react";
import FeaturedCourses from "./FeaturedCourses";
import ExpertSessions from "./ExpertSessions";
import JobOpportunities from "./JobOpportunities";
import Footer from "./Footer";
import Header from "./Header";
import CommunityVoices from "./CommunityVoices";
import FloatingChatbot from "./FloatingChatbot";
import LottieAnimation from "../animations/LottieAnimation";
  import AOS from "aos";
        import "aos/dist/aos.css"; // AOS styles
const HeroSection = () => {
  useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
  const [showCourses, setShowCourses] = useState(true);

  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-32 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('courses.png')" }}
        ></div>

        <div className="container mx-auto px-4 flex flex-wrap items-center relative z-10"
        data-aos="fade-right">
          <div className="w-full md:w-1/2">
            <h1 className="text-6xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-blue-200 to-purple-200 mb-4">
              Level up your career with expert-led courses
            </h1>
            <p className="text-gray-100 mb-6">
              Join thousands of learners acquiring in-demand skills, connecting with industry experts, and landing their dream jobs.
            </p>
            <div className="space-x-4">
              <button className="bg-gray-100 text-black px-6 py-3 rounded hover:bg-gray-200">
                Explore Courses
              </button>
              <button className="border border-white text-white px-6 py-3 rounded hover:bg-gray-200 hover:text-black duration-300">
                Meet Experts
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <div className="flex bg-gray-100 justify-center py-4">
        <button
          className={`px-6 py-3 rounded-l ${showCourses ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setShowCourses(true)}
        >
          Featured Courses
        </button>
        <button
          className={`px-6 py-3 rounded-r ${!showCourses ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setShowCourses(false)}
        >
          Workshops
        </button>
      </div>
      
      {showCourses ? <FeaturedCourses /> : <ExpertSessions />}
      
      <LottieAnimation />
      <Footer />
    </>
  );
};

export default HeroSection;
