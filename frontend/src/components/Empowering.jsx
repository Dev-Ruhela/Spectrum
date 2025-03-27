import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import { useEffect } from "react";
const Empowering = () => {

  
    useEffect(() => {
          AOS.init({ duration: 1000 });
        }, []);
    return (
        <>
        <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('diversity.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"
        ></div> {/* Overlay for contrast */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
        data-aos="fade-right">
          <div className="text-8xl md:text-7xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent from-pink-100 via-blue-100 to-purple-100 p-3 text-left">Empowering Dreams, Embracing Diversity</div>
          <p className="text-lg md:text-xl mb-8 max-w-4xl text-pink-100">
          We're building a world where everyone has equal opportunities to 
thrive, grow, and succeed - regardless of who they are or who they 
love. 
          </p>
          <div className="relative flex w-3/4 md:w-1/2">
            
          </div>
        </div>
      </section>
        </>
      );
};

export default Empowering;
