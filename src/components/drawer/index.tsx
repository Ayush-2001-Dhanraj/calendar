import React from "react";
import styles from "./drawer.module.css";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>

      <form>
        {/* title, date - time, description, create */}
        {/* title */}
        <div>
          <input placeholder="Add Title" />
        </div>
        {/* date - time */}
        <div>
          <button className={styles.dateBtn}>Some date and Time</button>
        </div>
        {/* description */}
        <div>
          <textarea placeholder="Add Description" />
        </div>
        <button className={`${styles.dateBtn} ${styles.saveBtn}`}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Drawer;
