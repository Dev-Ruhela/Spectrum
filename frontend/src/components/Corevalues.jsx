import React from "react";
import { useEffect } from "react";
const values = [
  {
    title: "Gender Equality",
    description: "Achieve gender equality and empower all.",
    image: "genderequality.webp",
  },
  {
    title: "Quality Education",
    description:
      "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    image: "qu.webp",
  },
  {
    title: "Decent Work and Economic Growth",
    description:
      "Promote sustained, inclusive, and sustainable economic growth, full and productive employment, and decent work for all.",
    image: "decentwork.webp",
  },
  // {
  //   title: "Partnerships",
  //   description:
  //     "Strengthen the means of implementation and revitalize the global partnership for sustainable development.",
  //   image: "partnerships.webp",
  // },
  // {
  //   title: "Reduced Inequalities",
  //   description: "Reduce inequality within and among countries.",
  //   image: "reducedineq.webp",
  // },
];
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles

  
const CoreValues = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="py-16  px-8"
    data-aos="fade-up"
    >
      {/* Section Title */}
      <h2 className="text-3xl font-semibold hover:text-blue-700  text-center text-gray-800 mb-12 duration-300">
        Our Core Values
      </h2>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {values.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-xl rounded-2xl p-6  hover:shadow-xl transition-shadow transform"
          >
            {/* Image Container */}
            <div className="w-20 h-20 rounded overflow-hidden border-4shadow-md">
              <img
                src={value.image}
                alt={value.title || "Image"}
                className="w-full h-full "
              />
            </div>

            {/* Content */}
            <div className="text-center mt-4">
              <h3 className="text-xl font-bold text-gray-900">{value.title}</h3>
              <p className="text-sm text-gray-700 mt-2">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreValues;
