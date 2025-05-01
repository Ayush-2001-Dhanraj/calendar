import React from "react";
import Lottie from "react-lottie";

interface AnimationContainerProps {
  animationData: any;
  height?: number;
  width?: number;
}

function AnimationContainer({
  animationData,
  height = 400,
  width = 400,
}: AnimationContainerProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
}

export default AnimationContainer;
