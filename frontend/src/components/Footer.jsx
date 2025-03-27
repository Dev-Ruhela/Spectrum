import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <Link
          to="/"
          >
          <div className="w-20">
            <img src="/logofooter.png" alt="Logo" />
          </div>
          </Link>
          <p className="text-lg mt-2 font-extralight">
            Empowering careers through expert-led learning and meaningful
            connections.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold">Platform</h4>
          <ul className="text-sm mt-2">
            <Link
            to="/courses"
            >
            <Link
            to="/courses"
            >
            <li className="group cursor-pointer">
              <span className="relative inline-block after:block after:content-[''] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                Browse Courses
              </span>
            </li>
            </Link>
            </Link>
            <li className="group cursor-pointer">
              <span className="relative inline-block after:block after:content-[''] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                Expert Connect
              </span>
            </li>
            <Link
            to="/jobs"
            >
            
            <li className="group cursor-pointer">
              <span className="relative inline-block after:block after:content-[''] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                Jobs
              </span>
            </li>
            </Link>
            <Link
            to="/campaigns"
            >
            <li className="group cursor-pointer">
              <span className="relative inline-block after:block after:content-[''] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                Campaigns
              </span>
            </li>
            </Link>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Company</h4>
          <ul className="text-sm mt-2">
            <Link to="/about" className="group">
              <li className="relative inline-block cursor-pointer after:block after:content-[''] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                About Us
              </li>
            </Link>
            <br />
            <Link to="/jobs" className="group">
              <li className="relative inline-block cursor-pointer after:block after:content-[''] after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 group-hover:after:w-full">
                Careers
              </li>
            </Link>
          </ul>
        </div>
        <div></div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        © 2025 Spectrum. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
