import React from "react";
import styles from "./footer.module.css";

export enum FooterMode {
  DARK = 0,
  LIGHT = 1,
}

export interface FooterProps {
  mode?: FooterMode;
}

function Footer({ mode = FooterMode.DARK }: FooterProps) {
  return (
    <div
      className={styles.footer}
      style={{
        backgroundColor: mode === FooterMode.DARK ? "#000" : "#fff",
        color: mode === FooterMode.DARK ? "#fff" : "#000",
      }}
    >
      <a
        href="https://github.com/Ayush-2001-Dhanraj"
        target="_blank"
        className={styles.creatorName}
        style={{
          color: mode === FooterMode.DARK ? "#fff" : "#000",
        }}
      >
        Ayush Dhanraj
      </a>
    </div>
  );
}

export default Footer;
