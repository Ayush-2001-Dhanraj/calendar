import React, { useRef, useState } from "react";
import styles from "./ProfileModel.module.css";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../input";
import { labelAlignValues } from "../../common";

function generatePositions() {
  const fields = ["First Name", "Last Name", "Email"];
  const positions: Record<string, { top: string; left: string }> = {};

  fields.forEach((field, index) => {
    positions[field] = {
      top: `${20 * index + 15}vh`,
      left: `-${Math.random() * 70 + 70}px`,
    };
  });

  return positions;
}

interface ProfileModeProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProfileModel({ isOpen, onClose }: ProfileModeProps) {
  const positionRef = useRef(generatePositions());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const inputData = [
    { label: "First Name", prop: "firstName" },
    { label: "Last Name", prop: "lastName" },
    { label: "Email", prop: "email", type: "email" },
  ];

  const handleChangeValue = (property: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [property]: value }));

    // Clear errors as user types
    setErrors((prev) => ({ ...prev, [property]: "" }));
  };

  console.log(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layout
          transition={{ duration: 0.5 }}
          className={styles.open}
        >
          <motion.div
            className={styles.backdrop}
            onClick={onClose}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className={styles.whiteBoard}
            initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
            exit={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.container}>
              <motion.div
                className={styles.fixedItem}
                initial={{ color: "rgba(255, 255, 255, 0)" }}
                animate={{ color: "rgba(0, 0, 0, 1)" }}
                exit={{ color: "rgba(255, 255, 255, 0)" }}
                transition={{ duration: 0.8 }}
              >
                <FaUser size={40} />
              </motion.div>
              {inputData.map(({ label, prop, type }, index) => (
                <motion.div
                  key={label}
                  className={styles.inputComp}
                  style={positionRef.current[label]}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }} // Reverse animation on exit
                  transition={{ duration: 0.8, delay: index * 0.4 }}
                >
                  <Input
                    label={label}
                    labelAlign={labelAlignValues.RIGHT}
                    value={registerData[prop as keyof typeof registerData]}
                    type={type}
                    onChange={(value) => handleChangeValue(prop, value)}
                  />
                  {errors[prop] && (
                    <p className={styles.errorText}>{errors[prop]}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProfileModel;
