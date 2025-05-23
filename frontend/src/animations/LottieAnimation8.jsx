import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';

const LottieAnimation8 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/chatbot'); 
  };

  return (
    <div
      className="cursor-pointer transition-transform duration-300 hover:scale-105"
    >
         {/* <div className='bg-opacity-30 mr-2 text-gray-500'> Need Assistance ?</div> */}
      <Player
        autoplay
        loop
        src="/events.json" // Path relative to the public folder
        style={{ height: '400px', width: '800px' }} // Smaller size
      />
    
    </div>
  );
};

export default LottieAnimation8;
