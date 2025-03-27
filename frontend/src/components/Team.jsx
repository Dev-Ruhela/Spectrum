import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import { FaLinkedin } from "react-icons/fa"; // Import LinkedIn icon

const teamMembers = [
  {
    image: "dev1.jpeg",
    name: "Dev Ruhela",
    linkedin: "https://www.linkedin.com/in/dev-ruhela/",
  },
  {
    image: "naitik.jpeg",
    name: "Naitik Jain",
    linkedin: "https://www.linkedin.com/in/naitik-jain-b48316290/",
  },
  {
    image: "yojit1.jpeg",
    name: "Yojit Kapoor",
    linkedin: "https://www.linkedin.com/in/yojit-kapoor-337542293/",
  },
  {
    image: "aayush.png",
    name: "Aayush Kanjani",
    linkedin: "https://www.linkedin.com/in/aayush-kanjani-105129280/",
  },
];

const Team = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="py-12 bg-white text-center" data-aos="fade-left">
      <h2 className="text-3xl font-bold mb-8">Our Team</h2>
      <div className="flex gap-6 justify-center flex-wrap">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-center"
          >
            <div className="relative w-32 h-32">
              {/* Profile Image */}
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full w-full h-full object-cover border-2 border-gray-300"
              />
              {/* LinkedIn Icon - Hidden by default, appears on hover */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <FaLinkedin className="text-white text-3xl" />
              </a>
            </div>
            <h3 className="text-lg text-gray-700 font-light mt-3">
              {member.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
