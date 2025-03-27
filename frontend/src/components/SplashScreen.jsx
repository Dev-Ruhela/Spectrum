// src/components/SplashScreen.jsx

import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Adjust the speed of progress

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="text-center">
        <div className="mb-8">
          <img src="/path_to_your_logo.png" alt="Logo" className="w-24 h-24 mx-auto" />
        </div>
        <div className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
