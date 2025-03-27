import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { SparkleIcon, SparklesIcon } from "lucide-react";

const LottieAnimation9 = () => {
  const [clicked, setClicked] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const navigate = useNavigate();


  return (
    <div
      className="cursor-pointer transition-transform duration-300 hover:scale-105"
    >
         {/* <div className='bg-opacity-30 mr-2 text-gray-500'> Need Assistance ?</div> */}
      <Player
        autoplay
        loop
        src="/explore.json" // Path relative to the public folder
        style={{ height: '25px', width: '25px' }} // Smaller size
      />
    
    </div>
  );
};

export default LottieAnimation9;
