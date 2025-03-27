import React, { useState  } from "react";
import { Bot } from "lucide-react";
import { Link, NavLink } from 'react-router-dom';

const FloatingChatbot = () => {
  

  return (
    <>
    
    <div className="fixed bottom-4 right-4 z-50 flex bg-gray-800 text-gray-200 rounded-2xl px-2.5 py-3  bg-opacity-80 items-center hover:bg-opacity-90 shadow-xl">
        <Link 
            to= "/chatbot"
            className="items-center rounded-lg"
        >
            <div className="flex gap-2 items-center">
            <Bot className="h-6 w-6"/>
                Start a chat !
            </div>
           
        </Link>

      </div>
      </>
  )
}
export default FloatingChatbot;
      