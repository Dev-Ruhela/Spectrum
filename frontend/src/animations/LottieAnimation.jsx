import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { SparkleIcon, SparklesIcon } from "lucide-react";

const LottieAnimation = () => {
  const [clicked, setClicked] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const hasPlayed = localStorage.getItem("botAnimationPlayed");
  //   if (hasPlayed) {
  //     setAnimationPlayed(true); // Prevents animation from playing again
  //   }
  // }, []);

  const handleClick = () => {
    if (!animationPlayed) {
      setClicked(true);
      localStorage.setItem("botAnimationPlayed", "true"); // Store in localStorage

      setTimeout(() => {
        navigate("/chatbot");
      }, 4000); // Delay navigation
    } else {
      navigate("/chatbot");
    }
  };

  return (
    <>
      {/* Background Blur Overlay */}
      {clicked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-40"
        />
      )}

      <motion.div
        initial={{ bottom: "20px", right: "20px", scale: 1 }}
        animate={
          clicked
            ? { bottom: "50%", right: "50%", x: "-50%", y: "50%", scale: 2 }
            : {}
        }
        transition={{ duration: 1, ease: "easeInOut" }}
        className="fixed cursor-pointer z-50"
        onClick={handleClick}
      >
        <Player
          autoplay
          loop={!clicked} // Stop loop when clicked
          src="/animation2.json"
          style={{ height: "150px", width: "150px" }}
        />

        {/* Speech Bubble Appears After Click */}
        {clicked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute w-full top-[-42px] left-1/2 transform -translate-x-1/2 bg-white text-gray-800 p-3 rounded-lg shadow-lg"
          >
            <div className="text-sm font-light flex "> 
            
              <div className="text-xs max-w-5xl">Hello, I am <span className="text-purple-600 font-normal">Lumi</span>, your helping chatbot! I would love to help you. </div>
            
            </div> 
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default LottieAnimation;
