import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
const VisionMission = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="py-12 bg-gradient-to-b from-white to-gray-200">
      <h2 className="text-3xl font-bold text-center mb-12"
      data-aos="fade-up"
      >Our Vision & Mission</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 items-center"
      data-aos="fade-right"
      data-aos-delay="200"
      >
        {/* Vision & Mission Section */}
        <div>
          {/* Vision Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-blue-600">Our Vision</h3>
            <p className="text-gray-600 mt-4">
              A world where every LGBTQ+ individual has equal access to career
              opportunities and can thrive in their chosen profession.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-600">Our Mission</h3>
            <p className="text-gray-600 mt-4">
              To empower the LGBTQ+ community through professional development,
              mentorship, and community building.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src="vision.png" // Replace with your image URL
            alt="Vision and Mission"
            className="rounded-lg shadow-lg h-96 w-70"
          />
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
