import React from "react";
// import Lottie from "react-lottie";
import AnimationLoading from "../Assets/SVG/AnimationLoading";

const LoadingScreen = () => {
  
  return (
    <div className="w-full h-screen flex items-center justify-center">
     <AnimationLoading></AnimationLoading>
    </div>
  );
};

export default LoadingScreen;
