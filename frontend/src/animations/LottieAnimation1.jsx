import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';

const LottieAnimation1 = () => {
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
        src="/success.json" // Path relative to the public folder
        style={{ height: '500px', width: '500px' }} // Smaller size
      />
    
    </div>
  );
};

export default LottieAnimation1;
