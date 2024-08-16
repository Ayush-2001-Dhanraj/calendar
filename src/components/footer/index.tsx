import React from "react";
import styles from "./footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <a
        href="https://github.com/Ayush-2001-Dhanraj"
        className={styles.creatorName}
      >
        Ayush Dhanraj
      </a>
    </div>
  );
}

export default Footer;
