import React from "react";
import styles from "./bottomNav.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDrawerState, toggleDrawer } from "../../redux/appSlice";
import { motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";
import { headerActions } from "../../common";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { BottomNavProps } from "../../common/interfaces";

function BottomNav({ onClickAction }: BottomNavProps) {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector(getDrawerState);

  const handleAddEvent = () => {
    dispatch(toggleDrawer());
  };

  return (
    <div className={styles.bottomNav}>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onClickAction(headerActions.BACK)}
        className={styles.btns}
      >
        <HiOutlineArrowLeft size={25} />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.2 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={`${styles.createEventFAB} ${
          isDrawerOpen ? styles.hidden : ""
        }`}
        onClick={handleAddEvent}
      >
        <IoMdAdd size={25} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onClickAction(headerActions.NEXT)}
        className={styles.btns}
      >
        <HiOutlineArrowRight size={25} />
      </motion.button>
    </div>
  );
}

export default BottomNav;
