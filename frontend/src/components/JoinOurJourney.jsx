import { InstagramIcon, Link } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
  
const JoinOurJourney = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="py-12 bg-gradient-to-b from-black to-gray-900 text-center"
    
    >
<h2 className="text-3xl font-light -mt-8 mb-12 text-white hover:text-blue-500 duration-500 relative inline-block group"
data-aos="fade-up"
>
  Join Our Journey
  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-500 group-hover:w-full group-hover:left-0 group-hover:origin-left group-hover:scale-x-100 group-hover:opacity-100 origin-right scale-x-0 opacity-0"></span>
</h2>
      <div className="flex gap-16 justify-center items-center"
      data-aos="fade-up"
      >
        <NavLink
          to="https://www.instagram.com/spectrum.pride/"
          target="_blank"
        >
          <img src="instagram.png" alt="" className="h-12 w-12 hover:scale-110 duration-300"/>
        </NavLink>
          <NavLink
            to="mailto:lgbtq.spectrum1@gmail.com"
          >
          <img src="gmail.png" alt="" className="h-12 w-12 hover:scale-110 duration-300" />

          </NavLink>
          <img src="twitter_white.png" alt="" className="h-10 w-10 text-white hover:scale-110 duration-300" />
          <img src="linkedin.png" alt="" className="h-12 w-12 text-white hover:scale-110 duration-300" />

        </div>
      </div>
  );
};

export default JoinOurJourney;
