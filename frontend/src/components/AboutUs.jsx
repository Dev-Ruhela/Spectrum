import React from "react";
import Stats from "./Stats";
import { useEffect } from "react";
import CoreValues from "./Corevalues";
import Header from "./Header";
import CommunityVoices from "./CommunityVoices";
import Team from "./Team";
import VisionMission from "./VisionMission";
import JoinOurJourney from "./JoinOurJourney";
import Footer from "./Footer";
import Empowering from "./Empowering";
import FloatingChatbot from "./FloatingChatbot";
import LottieAnimation from "../animations/LottieAnimation";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
const AboutUs = () => {

  useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
    return (
    <>
    <Header />
    <LottieAnimation />
    <Empowering />
    <Stats />
      <CoreValues />
      {/* <CommunityVoices /> */}
      <Team />
      <VisionMission />
      <JoinOurJourney />
      <Footer />
    </>
    );
};

export default AboutUs;