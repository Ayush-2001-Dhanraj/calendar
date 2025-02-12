import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./loginView.module.css";
import Input from "../../components/input";
import { labelAlignValues } from "../../common";
import Button from "../../components/button";
import { motion } from "framer-motion";
import Footer from "../../components/footer";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/appSlice";
import AuthService from "../../services/AuthService";
import toast from "react-hot-toast";
import UserService from "../../services/UserServices";

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

  const handleSubmit = async () => {
    if (!isRegister) {
      // Login Flow
      const payload = {
        email: registerData.email,
        password: registerData.password,
      };
      const result = await AuthService.login(payload);
      if (result.msg) {
        toast.error(result.msg);
      } else {
        dispatch(setUser({ user: result.user }));
        toast.success("Login Successful!");
      }
    } else {
      // Register Flow
      const payload = {
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
      };
      const result = await AuthService.register(payload);
      if (result.msg) {
        toast.error(result.msg);
      } else {
        dispatch(setUser({ user: result.user }));
        toast.success("Registration Successful!");
      }
    }
  };

  useEffect(() => {
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verifyPassword: "",
    });
  }, [isRegister]);

  const getCurrentUser = useCallback(async () => {
    const response = await UserService.getCurrentUser();
    if (!response.msg) {
      toast.success("Welcome Back!");
      dispatch(setUser({ user: response.user }));
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, []);

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
