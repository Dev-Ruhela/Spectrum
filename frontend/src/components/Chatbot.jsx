import React, { useState, useRef, useEffect } from "react";
import Footer from "./Footer";
import { Send, SparklesIcon, ChevronDown } from "lucide-react";
import Header from "./Header";
import { Link } from "react-router-dom";
import LottieAnimation from "../animations/LottieAnimation";
import { useAuthStore } from "../../firebase";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";




const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" }
  ]);

  const [message, setMessage] = useState("You are Lumi, an LGBTQ+ support chatbot based in India. Your role is to inform users about their legal rights, provide emotional support, and offer motivation when needed. Keep your responses short, factual, and supportive. Stay respectful and inclusive in tone. Provide legal rights as per Indian laws and relevant resources if applicable. This is the user prompt attached -> ")
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-2.0-flash");
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const chatRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { generateAIResponse } = useAuthStore();

  // Scroll to latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

const sendMessage = async () => {
  if (!input.trim()) return;
  setLoading(true);

  const userMessage = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    // Get AI response
    const response = await generateAIResponse(input, message);

    if (!response) {
      throw new Error("Empty response from AI.");
    }

    // Replace **text** with <b>text</b>
    let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    // Sanitize response to prevent XSS
    const cleanResponse = DOMPurify.sanitize(formattedResponse);

    setMessages((prev) => [...prev, { sender: "bot", text: cleanResponse }]);
  } catch (error) {
    toast.error("Error fetching AI response:", error);
    setMessages((prev) => [...prev, { sender: "bot", text: "Error fetching response." }]);
  }

  setLoading(false);
};


  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleModelDropdown = () => {
    setShowModelDropdown(!showModelDropdown);
  };

  const selectModel = (model) => {
    setSelectedModel(model);
    setShowModelDropdown(false);
  };

  const MessageBubble = ({ msg }) => {
    const [visibleText, setVisibleText] = useState("");
    const words = msg.text.split(" ");
    const delay = 50; // Adjust delay for faster/slower reveal
  
    useEffect(() => {
      if (msg.sender === "bot" && msg.revealing) {
        let i = 0;
        const interval = setInterval(() => {
          if (i < words.length) {
            setVisibleText((prev) => prev + " " + words[i]);
            i++;
          } else {
            clearInterval(interval);
          }
        }, delay);
        return () => clearInterval(interval);
      } else {
        setVisibleText(msg.text);
      }
    }, [msg.text]);
  
    return (
      <div className={`my-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
        <div 
          className={`p-3 rounded-2xl shadow-sm ${
            msg.sender === "user" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-100 border border-gray-200"
          }`}
          style={{
            maxWidth: "80%",
            width: msg.sender === "bot" ? "max-content" : "auto",
            minWidth: msg.sender === "bot" ? "220px" : "auto"
          }}
        >
          <div className="font-bold mb-1">
            {msg.sender === "user" ? "" : "Lumi: "}
          </div>
          <pre 
            className={`whitespace-pre-wrap ${msg.sender === "user" ? "text-white" : "text-gray-800"}`}
            style={{ fontFamily: "sans-serif", fontSize: "0.95rem", lineHeight: "1.4" }}
            dangerouslySetInnerHTML={{ __html: visibleText }}
          />
        </div>
      </div>
    );
  };
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-6 py-6 flex flex-row gap-4">
        {/* Left Section */}
        <div className="w-full md:w-1/4 flex flex-col gap-4">
          <div className="bg-gray-100  p-4 rounded-2xl shadow-lg  ">
            <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
            <ul className="space-y-2">
              {['Legal Rights', 'Job Opportunities', 'Safety Resources', 'Community Events / Campaigns'].map((item, i) => (
                <li key={i}>
                  <button className="w-full bg-white text-left px-4 py-3 rounded-xl shadow-sm hover:bg-gray-50 flex items-center transition-all duration-200">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-full md:w-1/2 bg-inherit p-5 rounded-2xl shadow-sm flex flex-col ">
          <h2 className="text-lg flex gap-2 items-center font-semibold mb-4">
            <span className="flex items-center">
              Chat with Lumi: LBGTQIA+ Rights Bot 
              <SparklesIcon className="h-5 w-5 ml-2 text-blue-500"/>
            </span>
          </h2>
          <div 
          ref={chatRef} 
          className="bg-white p-4 border border-gray-300  rounded-xl shadow-sm mb-4 flex-grow overflow-y-auto"
          style={{ maxHeight: "450px", minHeight: "450px" }} 
        >
          {messages.map((msg, index) => (
            <div key={index} className={`my-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div 
                className={`p-3 rounded-2xl shadow-sm ${
                  msg.sender === "user" 
                    ? "bg-blue-500 text-white" 
                    : "bg-gray-100 border border-gray-200"
                }`}
                style={{
                  maxWidth: "80%",
                  width: msg.sender === "bot" ? "max-content" : "auto",
                  minWidth: msg.sender === "bot" ? "220px" : "auto"
                }}
              >
                <div className="font-semibold mb-1">
                  {msg.sender === "user" ? "" : "Lumi: "}
                </div>
                <pre 
                  className={`whitespace-pre-wrap ${msg.sender === "user" ? "text-white" : "text-gray-800"}`}
                  style={{ fontFamily: "sans-serif", fontSize: "0.95rem", lineHeight: "1.4" }}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start my-3">
              <div className="p-3 rounded-2xl bg-gray-100 border border-gray-200 shadow-sm" style={{ minWidth: "120px" }}>
                <div className="font-medium mb-1">Lumi</div>
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
      </div>
          <div className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="w-full border border-gray-400 rounded-l-xl px-4 py-2 focus:outline-gray-600  h-14 transition-all duration-200"
            /> 
            <div className="relative">
              {/* <button 
                onClick={toggleModelDropdown} 
                className="bg-gray-200 text-black h-14 px-3 flex items-center hover:bg-gray-300 transition-colors duration-200"
              >
                {selectedModel === "gemini-2.0-flash" ? "Gemini" : "Gemma"}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button> */}
              
              {showModelDropdown && (
                <div className="absolute bottom-16 right-0 w-48 bg-white border border-gray-300 rounded-xl shadow-lg z-10">
                  <ul>
                    <li 
                      className={`px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-t-xl ${selectedModel === "gemini-2.0-flash" ? "bg-gray-100" : ""}`}
                      onClick={() => selectModel("gemini-2.0-flash")}
                    >
                      Gemini 2.0 Flash
                    </li>
                    <li 
                      className={`px-4 py-3 hover:bg-gray-100 cursor-pointer rounded-b-xl ${selectedModel === "gemma-2.0" ? "bg-gray-100" : ""}`}
                      onClick={() => selectModel("gemma-2.0")}
                    >
                      Gemma 2.0
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <button 
              onClick={sendMessage} 
              className="bg-blue-600 text-white px-5 py-2 rounded-r-xl h-14 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/4 bg-gray-50 p-4 h-fit rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Emergency Resources</h2>
          <ul className="space-y-3">
            <li>
              <button className="w-full bg-red-50 text-left px-4 py-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-100 transition-colors duration-200">
                Crisis Helpline: 1-800-273-8255
              </button>
            </li>
            <li>
              <button className="w-full bg-blue-50 text-left px-4 py-3 rounded-xl border border-blue-300 text-blue-600 hover:bg-blue-100 transition-colors duration-200">
                Legal Aid: 1-888-843-4564
              </button>
            </li>
            <li>
              <button className="w-full bg-green-50 text-left px-4 py-3 rounded-xl border border-green-300 text-green-600 hover:bg-green-100 transition-colors duration-200">
                <Link to="/connect">
                  Safe Spaces: Find nearest location
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chatbot;