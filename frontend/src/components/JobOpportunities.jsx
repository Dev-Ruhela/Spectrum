import React, { useEffect } from "react";
import { useAuthStore } from "../../firebase";
import { Briefcase, MapPin, DollarSign, GraduationCap , IndianRupeeIcon } from "lucide-react";
import AOS from "aos";
      import "aos/dist/aos.css"; // AOS styles
const JobOpportunities = () => {
  const { jobs, fetchJobs } = useAuthStore();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    
 
      
      
       
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-50">
      <div className="container mx-auto px-4"
      data-aos="fade-up">
        <h2 className="text-3xl flex items-center gap-2 font-normal ml-2 mb-8 text-black ">Featured Job Opportunities <Briefcase className="h-7 w-7"/> </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between   hover:shadow-xl  transition-all duration-300 "
              
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {/* {job.logo ? (
                    <img src="{job.logo}" alt="Company Logo" className="w-12 h-12 rounded-full" />
                  ) : (
                    <Briefcase className="w-12 h-12 text-gray-400" />
                  )} */}
                  <img src={job.logo} alt="Company Logo" className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{job.company}</h3>
                    <p className="text-sm text-gray-600">{job.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" /> {job.place}
                </p>
                <p className="text-gray-700 flex items-center gap-2 mt-1">
                  <GraduationCap className="w-4 h-4 text-gray-500" /> {job.requirements}
                </p>
                <p className="text-gray-700 flex items-center gap-2 mt-1">
                  <IndianRupeeIcon className="w-4 h-4 text-gray-500" /> {job.pay} 
                </p>
                <p className="text-gray-900 font-normal mt-1">Experience: {job.experience}</p>
              </div>
              <button className="mt-5 font-light bg-inherit hover:bg-black hover:text-white  bg-black text-black border border-black px-4 py-2 rounded-lg duration-300">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobOpportunities;
