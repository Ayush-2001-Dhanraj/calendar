import React, { useEffect, useRef, useState } from "react";
import styles from "./loginView.module.css";
import Input from "../../components/input";
import { labelAlignValues } from "../../common";
import Button from "../../components/button";
import { motion } from "framer-motion";
import Footer from "../../components/footer";
import { useAppDispatch } from "../../redux/store";
import {
  fetchEventsFromBackend,
  setLoadingFalse,
  setLoadingTrue,
  setUser,
} from "../../redux/appSlice";
import AuthService from "../../services/AuthService";
import toast from "react-hot-toast";
import wind_clouds from "../../assets/animations/wind_cloud.json";
import AnimationContainer from "../../components/AnimationContainer";
import cloud from "../../assets/animations/clouds.json";
import bird_flying from "../../assets/animations/bird_flying.json";

function generatePositions() {
  const fields = [
    "First Name",
    "Last Name",
    "Email",
    "Password",
    "Verify Password",
  ];

  const positions: Record<string, { top: string; left: string }> = {};
  const minLeft = 30;
  const maxLeft = 50;
  const topStart = 8;
  const topGap = 10;

  fields.forEach((field, index) => {
    const top = `${topStart + index * topGap}vh`;
    const left = `${Math.random() * (maxLeft - minLeft) + minLeft}vw`;
    positions[field] = { top, left };
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isRegister, setIsRegister] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const dispatch = useAppDispatch();

  const positionRef = useRef(generatePositions());

  const handleChangeValue = (property: string, value: string) => {
    setRegisterData((prev) => ({ ...prev, [property]: value }));

    // Clear errors as user types
    setErrors((prev) => ({ ...prev, [property]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(registerData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!registerData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 8) {
      newErrors.password = "Minimum length 8";
    }

    if (isRegister) {
      if (!registerData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!registerData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!registerData.verifyPassword.trim()) {
        newErrors.verifyPassword = "Please confirm your password";
      } else if (registerData.password !== registerData.verifyPassword) {
        newErrors.verifyPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (!validateForm()) return;

    dispatch(setLoadingTrue());

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
        dispatch(fetchEventsFromBackend(result.user.id));
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
        dispatch(fetchEventsFromBackend(result.user.id));
        toast.success("Registration Successful!");
      }
    }

    dispatch(setLoadingFalse());
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setRegisterData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      verifyPassword: "",
    });
    setErrors({});
  }, [isRegister]);

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
            {errors[prop] && <p className={styles.errorText}>{errors[prop]}</p>}
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
      <div className={`${styles.animationContainer} ${styles.windmill}`}>
        <AnimationContainer
          animationData={wind_clouds}
          height={screenHeight * 0.9}
          width={screenHeight * 0.9}
        />
      </div>
      <div className={`${styles.animationContainer} ${styles.cloudsA}`}>
        <AnimationContainer
          animationData={cloud}
          height={screenWidth * 0.5}
          width={screenWidth * 1.0}
        />
      </div>
      <div className={`${styles.animationContainer}`}>
        <AnimationContainer
          animationData={bird_flying}
          height={screenHeight * 0.4}
          width={screenWidth * 1.0}
        />
      </div>
    </>
  );
}

export default LoginView;
