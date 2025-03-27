import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Career from "./components/Career";
import NGOLocatorPage from "./components/NGOLocatorPage";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import Chatbot from "./components/Chatbot";
import Shopping from "./components/Shopping";
import Campaign from "./components/Campaigns";
import Connect from "./components/Connect";
import ProfileCard from "./components/Profile/ProfileCard";
import Explore from "./components/Explore";
import { useAuthStore } from "../firebase";
import { Toaster } from "react-hot-toast";
import Jobs from "./components/Jobs";

function App() {
  const { isAuthenticated, user, checkAuth, isCheckingAuth } = useAuthStore();

  // ProtectedRoute for authenticated users
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // RedirectAuthenticatedUser for redirecting logged-in users from certain routes
  const RedirectAuthenticatedUser = ({ children }) => {
    if (isAuthenticated && user?.emailVerified) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // Call `checkAuth` on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  //Show a loading screen while checking authentication
  if (isCheckingAuth) {
    return <div className="loading-screen bg-gray-100 ">
      <div className="absolute left-1/2 top-1/2 ">
      <img src="logo.png" alt="" className="h-16 w-16 animate-spin"/>
      </div>
      
    </div>;
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<HeroSection />} />
        <Route path="/ngo-locator" element={<NGOLocatorPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/campaigns" element={<Campaign />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route
          path="/connect"
          element={
              <Connect />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileCard />
            </ProtectedRoute>
          }
        />
        <Route path="/explore" element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
          } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
