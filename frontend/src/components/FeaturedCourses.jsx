// components/FeaturedCourses.jsx
import React, { useEffect } from "react";
import { useAuthStore } from "../../firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NotebookPen } from "lucide-react";
import AOS from "aos";
      import "aos/dist/aos.css"; // AOS styles

  
const FeaturedCourses = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const { courses, fetchCourses } = useAuthStore();

  useEffect(() => {
    const getCourses = async () => {
      try {
        await fetchCourses();
      } catch (error) {
        toast.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4"
      data-aos="fade-up">
        <h2 className="text-3xl flex gap-2 font-normal mb-8 text-black items-center hover:text-blue-700 duration-500">Featured Courses <NotebookPen /></h2>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-100 shadow-md hover:shadow-lg rounded-lg bg-opacity-5 overflow-hidden flex flex-col"
            >
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-gray-900 bg-gray-50 flex flex-col flex-grow">
                <div className="text-sm text-blue-800 bg-blue-400 px-2 py-1 bg-opacity-25 w-fit rounded-2xl">
                  {course.type}
                </div>
                <h3 className="text-lg font-semibold  mt-2">{course.name}</h3>
                
                {/* Fixed height for description */}
                <p className="text-sm text-gray-900 mt-2 flex-grow">
                  {course.description.substring(0, 100)}...
                </p>
                
                <div className="mt-auto flex justify-between items-center pt-4">
                  <p className="text-sm font-semibold text-gray-700 flex items-center justify-center gap-1"><img src="/star.png" alt="" className="h-5 w-5" /> {course.rating}/5</p>
                  <Link
                    to={course.register}
                    target="_blank"
                    className="p-2 border border-black text-black rounded hover:bg-gray-800 hover:text-white duration-300 font-light"
                  >
                    Register for free
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
