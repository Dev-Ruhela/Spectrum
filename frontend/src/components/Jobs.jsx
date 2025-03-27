// components/HeroSection.jsx
import React from "react";
import { useEffect } from "react";
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
const Jobs = () => {
  
  
    useEffect(() => {
          AOS.init({ duration: 1000 });
        }, []);
  return (
    <>
    <Header />
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-36 relative">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-30"
    style={{ backgroundImage: "url('jobs.png')" }}
  ></div>

  <div className="container mx-auto px-4 flex flex-wrap items-center relative z-10">
    <div className="w-full md:w-1/2 "
    data-aos="fade-right">
      <h1 className="text-6xl font-semibold py-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-blue-400 to-purple-400 mb-4">
        Explore job opportunities around you
      </h1>
      <p className="text-gray-50 mb-6">
        Join thousands of learners acquiring in-demand skills, connecting with industry experts, and landing their dream jobs.
      </p>
      <div className="space-x-4">
        <button className="bg-gray-100 text-black px-6 py-3 rounded hover:bg-gray-200">
          Featured Jobs
        </button>
        {/* <button className="border border-white text-white px-6 py-3 rounded hover:bg-gray-200 hover:text-black duration-300">
          Make Resume
        </button> */}
      </div>
    </div>
  </div>
</section>

          <JobOpportunities />
          <LottieAnimation />
    <Footer />
    </>
  );
};

export default Jobs;
