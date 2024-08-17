import React from "react";
import styles from "./button.module.css";
import { motion } from "framer-motion";

export interface ButtonProps {
  text: string;
  onClick: (e: any) => void;
  style?: object;
  type?: "button" | "submit" | "reset";
}

function Button({ text, onClick, style, type = "button" }: ButtonProps) {
  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        type={type}
        className={styles.btn}
        style={style}
        onClick={onClick}
      >
        {text}
      </motion.button>
    </>
  );
}

export default Button;
