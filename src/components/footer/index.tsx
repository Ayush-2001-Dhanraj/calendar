import React from "react";
import styles from "./footer.module.css";

export enum FooterMode {
  DARK = 0,
  LIGHT = 1,
}

function Footer() {
  return (
    <div className={styles.footer}>
      <a
        href="https://github.com/Ayush-2001-Dhanraj"
        target="_blank"
        rel="noreferrer"
        className={styles.creatorName}
      >
        Ayush Dhanraj ❤
      </a>
    </div>
  );
}

export default Footer;
