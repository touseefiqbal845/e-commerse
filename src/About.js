import React from "react";
import HeroSection from "./components/HeroSection";

const About = () => {
  const data = {
    name: "Touseef Store",
    name:"About us."
  };

  return <HeroSection myData={data} />;
};

export default About;
