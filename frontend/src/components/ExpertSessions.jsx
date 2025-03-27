// components/ExpertSessions.jsx
import { BellRing } from "lucide-react";
import React, { useEffect } from "react";
import { useAuthStore } from "../../firebase";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
const ExpertSessions = () => {

    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
    const { courses, fetchCourses } = useAuthStore();
  const { workshops, fetchWorkshops } = useAuthStore();

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        await fetchWorkshops();
      } catch (error) {
        toast.error("Error fetching workshops:", error);
      }
    };
    getWorkshops();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 to-gray-100">
      <div className="container mx-auto px-6"
      data-aos="fade-up">
        <h2 className="text-3xl font-normal mb-8 text-gray-900 flex items-center gap-3 ">
          Upcoming Expert Sessions & Workshops <BellRing className="text-black" /> 
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {workshops.map((workshop) => (
            <motion.div
            
              key={workshop.id}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <div className="flex justify-between items-center">
  <div>
    <h3 className="text-lg text-gray-900 font-light -ml-1 bg-gray-100 rounded-full px-4 py-2 w-fit mb-3">
      {workshop.title}
    </h3>
    <p className="text-sm text-gray-700 font-medium">
      with <span className="font-bold text-gray-900">{workshop.speaker}</span>
    </p>
    <p className="text-sm text-gray-600 mt-4">
      📅 <span className="font-semibold">{workshop.date}</span> <br />
      🕒 <span className="font-semibold">{workshop.time}</span>
    </p>
  </div>
  <div className="h-28 w-28 overflow-hidden">
    <img 
      src="workshop.jpeg" 
      alt="Workshop" 
      className="w-full h-full object-contain"
    />
  </div>
</div>

              <button className="mt-6 w-full bg-inherit border border-black  text-black font-light px-4 py-2 rounded-lg hover:bg-black hover:text-white  duration-300">
                Reserve Your Spot
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertSessions;
