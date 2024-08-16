import React, { useState } from "react";
import styles from "./loginView.module.css";
import Input from "../../components/input";
import { labelAlignValues } from "../../common";

function LoginView() {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const handleChangeValue = (property: string, value: string) => {
    setRegisterData((preV) => {
      return { ...preV, [property]: value };
    });
  };

  return (
    <div className={styles.loginView}>
      <div className={styles.section}>
        <Input
          label="First Name"
          labelAlign={labelAlignValues.LEFT}
          value={registerData.firstName}
          onChange={(value: string) => handleChangeValue("firstName", value)}
        />
        <Input
          label="Last Name"
          labelAlign={labelAlignValues.RIGHT}
          value={registerData.lastName}
          onChange={(value: string) => handleChangeValue("lastName", value)}
        />
        <Input
          label="Email"
          labelAlign={labelAlignValues.CENTER}
          value={registerData.email}
          onChange={(value: string) => handleChangeValue("email", value)}
        />
        <Input
          label="Password"
          labelAlign={labelAlignValues.LEFT}
          value={registerData.password}
          onChange={(value: string) => handleChangeValue("password", value)}
        />
        <Input
          label="Verify Password"
          labelAlign={labelAlignValues.RIGHT}
          value={registerData.verifyPassword}
          onChange={(value: string) =>
            handleChangeValue("verifyPassword", value)
          }
        />
      </div>
      <hr className={styles.divider} />
      <div className={styles.section}></div>
    </div>
  );
}

export default LoginView;
