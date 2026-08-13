import React from "react";
import Hero from "../components/Home/Hero";
import NewLaunches from "../components/Home/NewLaunches";
import ReelSec from "../components/Home/ReelSec";

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      
      <Hero />

      <div className="bg-white">
        <NewLaunches />
      </div>

      <ReelSec />

      <div className="py-8 flex justify-center">
        <div className="h-1 w-20 bg-yellow-400 rounded-full opacity-50" />
      </div>
     
    </div>
  );
};

export default Home;
