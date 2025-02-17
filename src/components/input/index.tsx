import React, { useRef, useEffect } from "react";
import styles from "./input.module.css";
import { labelAlignValues } from "../../common";

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  labelAlign: labelAlignValues;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  expandWidth?: boolean;
}

function Input({
  label,
  value,
  onChange,
  labelAlign,
  type = "text",
  required = false,
  disabled = false,
  expandWidth = false,
}: InputProps) {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (expandWidth && inputRef.current) {
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "nowrap";
      tempSpan.style.font = getComputedStyle(inputRef.current).font;
      tempSpan.textContent = value || " ";
      document.body.appendChild(tempSpan);
      inputRef.current.style.width = `${tempSpan.offsetWidth + 30}px`;
      document.body.removeChild(tempSpan);
    }
  }, [value, expandWidth]);

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
        ref={inputRef}
        value={value}
        onChange={handleValueChange}
        type={type}
        id={label}
        required={required}
        className={`${styles.input} ${expandWidth ? styles.expandWidth : ""}`}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
