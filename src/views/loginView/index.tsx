import React, { useRef, useState } from "react";
import styles from "./loginView.module.css";
import Input from "../../components/input";
import { labelAlignValues } from "../../common";
import Button from "../../components/button";
import { motion } from "framer-motion";
import Footer from "../../components/footer";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/appSlice";

function generatePositions() {
  const fields = [
    "First Name",
    "Last Name",
    "Email",
    "Password",
    "Verify Password",
  ];
  const positions: Record<string, { top: string; left: string }> = {};

  fields.forEach((field, index) => {
    positions[field] = {
      top: `${8 + index * 10}vh`,
      left: `${Math.random() * 60 + 10}vw`,
    };
  });

  return positions;
}

function LoginView() {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [isRegister, setIsRegister] = useState(true);
  const dispatch = useAppDispatch();

  const positionRef = useRef(generatePositions());

  const handleChangeValue = (property: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [property]: value }));
  };

  const toggleView = () => setIsRegister((prev) => !prev);

  const inputData = isRegister
    ? [
        { label: "First Name", prop: "firstName" },
        { label: "Last Name", prop: "lastName" },
        { label: "Email", prop: "email" },
        { label: "Password", prop: "password", type: "password" },
        { label: "Verify Password", prop: "verifyPassword", type: "password" },
      ]
    : [
        { label: "Email", prop: "email" },
        { label: "Password", prop: "password", type: "password" },
      ];

  const handleSubmit = () => {
    console.log("Submitting...");
    dispatch(setUser({ user: "yaash" }));
  };

  return (
    <>
      <div className={styles.loginView}>
        {inputData.map(({ label, prop, type }, index) => (
          <motion.div
            key={label}
            className={styles.inputComp}
            style={positionRef.current[label]}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.4 }}
          >
            <Input
              label={label}
              labelAlign={labelAlignValues.CENTER}
              value={registerData[prop as keyof typeof registerData]}
              type={type}
              onChange={(value) => handleChangeValue(prop, value)}
            />
          </motion.div>
        ))}
      </div>
      <div className={styles.actionSection}>
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={toggleView}
          className={styles.toggleViewBtn}
        >
          {isRegister ? "Login??" : "Register??"}
        </motion.button>
        <Button
          text={isRegister ? "Register" : "Login"}
          type="submit"
          onClick={handleSubmit}
        />
        <Footer />
      </div>
    </>
  );
}

export default LoginView;
