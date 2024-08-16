import React from "react";
import styles from "./input.module.css";
import { labelAlignValues } from "../../common";

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  labelAlign: labelAlignValues;
}

function Input({ label, value, onChange, labelAlign }: InputProps) {
  const handleValueChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={styles.inputContainer}
      style={{
        alignItems: labelAlign,
      }}
    >
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <input
        value={value}
        onChange={handleValueChange}
        type="text"
        id={label}
        className={styles.input}
      />
    </div>
  );
}

export default Input;
