import React, { useState } from "react";
import styles from "./loginView.module.css";
import Input from "../../components/input";
import { labelAlignValues } from "../../common";
import Button from "../../components/button";
import { motion } from "framer-motion";
import Footer, { FooterMode } from "../../components/footer";

function LoginView() {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [isRegister, setIsRegister] = useState(true);

  const handleChangeValue = (property: string, value: string) => {
    setRegisterData((prev) => {
      return { ...prev, [property]: value };
    });
  };

  const toggleView = () => setIsRegister((prev) => !prev);

  const inputData = isRegister
    ? [
        {
          label: "First Name",
          labelAlign: labelAlignValues.LEFT,
          onChange: (value: string) => handleChangeValue("firstName", value),
          value: registerData.firstName,
          style: { left: `${Math.random() * (100 - 20) + 20}px` },
        },
        {
          label: "Last Name",
          labelAlign: labelAlignValues.RIGHT,
          onChange: (value: string) => handleChangeValue("lastName", value),
          value: registerData.lastName,
          style: { right: `${Math.random() * (100 - 20) + 20}px` },
        },
        {
          label: "Email",
          labelAlign: labelAlignValues.CENTER,
          onChange: (value: string) => handleChangeValue("email", value),
          value: registerData.email,
          style: { left: 0, right: 0 },
        },
        {
          label: "Password",
          labelAlign: labelAlignValues.LEFT,
          onChange: (value: string) => handleChangeValue("password", value),
          value: registerData.password,
          type: "password",
          style: { left: `${Math.random() * (100 - 20) + 20}px` },
        },
        {
          label: "Verify Password",
          labelAlign: labelAlignValues.RIGHT,
          onChange: (value: string) =>
            handleChangeValue("verifyPassword", value),
          value: registerData.verifyPassword,
          type: "password",
          style: { right: `${Math.random() * (100 - 20) + 20}px` },
        },
      ]
    : [
        {
          label: "Email",
          labelAlign: labelAlignValues.LEFT,
          onChange: (value: string) => handleChangeValue("email", value),
          value: registerData.email,
          style: { left: `${Math.random() * (100 - 80) + 80}px` },
        },
        {
          label: "Password",
          labelAlign: labelAlignValues.RIGHT,
          onChange: (value: string) => handleChangeValue("password", value),
          value: registerData.password,
          type: "password",
          style: { right: `${Math.random() * (100 - 80) + 80}px` },
        },
      ];

  return (
    <div className={styles.loginView}>
      <div className={styles.section}></div>
      <hr className={styles.divider} />
      <div className={styles.section}></div>
      {inputData.map((e, index) => {
        return (
          <div
            className={styles.inputComp}
            style={{ ...e.style, top: `${(index + 1) * 80}px` }}
            key={e.label}
          >
            <Input
              label={e.label}
              labelAlign={e.labelAlign}
              value={e.value}
              type={e.type}
              onChange={e.onChange}
            />
          </div>
        );
      })}
      <div className={styles.actionSection}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={toggleView}
          className={styles.toggleViewBtn}
        >
          {isRegister ? "Login??" : "Register??"}
        </motion.div>
        <Button
          text={isRegister ? "Register" : "Login"}
          type="submit"
          onClick={() => {}}
        />
        <Footer mode={FooterMode.LIGHT} />
      </div>
    </div>
  );
}

export default LoginView;
