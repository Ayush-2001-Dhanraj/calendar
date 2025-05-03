import React from "react";
import loading_bird from "../../assets/animations/loading_bird.json";
import AnimationContainer from "../AnimationContainer";
import styles from "./LoadingComp.module.css";
import { useAppSelector } from "../../redux/store";
import { getIsLoading } from "../../redux/appSlice";

function LoadingComp() {
  const isLoading = useAppSelector(getIsLoading);

  return (
    <>
      {isLoading && (
        <div className={styles.loadingBird}>
          <div>
            <AnimationContainer animationData={loading_bird} />
          </div>
        </div>
      )}
    </>
  );
}

export default LoadingComp;
