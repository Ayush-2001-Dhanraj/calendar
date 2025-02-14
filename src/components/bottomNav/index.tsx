import React from "react";
import styles from "./bottomNav.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getDrawerState, resetState, toggleDrawer } from "../../redux/appSlice";
import { motion } from "framer-motion";
import { IoMdAdd } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { headerActions } from "../../common";
import { FaUser } from "react-icons/fa";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import { BottomNavProps } from "../../common/interfaces";
import AuthService from "../../services/AuthService";
import toast from "react-hot-toast";

const buttonVariants = {
  hover: { scale: 1.2 },
  tap: { scale: 0.9 },
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

// Define TypeScript types for props
interface ActionButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  hidden?: boolean;
}

// Reusable ActionButton Component
const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  onClick,
  hidden = false,
}) => (
  <motion.button
    whileHover="hover"
    whileTap="tap"
    initial="hidden"
    animate="visible"
    variants={buttonVariants}
    className={`${styles.createEventFAB} ${hidden ? styles.hidden : ""}`}
    onClick={onClick}
  >
    {icon}
  </motion.button>
);

const BottomNav: React.FC<BottomNavProps> = ({ onClickAction }) => {
  const dispatch = useAppDispatch();
  const isDrawerOpen = useAppSelector(getDrawerState);

  const handleViewUserDetails = () => {};
  const handleAddEvent = () => dispatch(toggleDrawer());
  const handleLogout = async () => {
    const result = await AuthService.logout();
    if (result && result.msg === "Logout Successful!") {
      dispatch(resetState());
      toast.success("Logout Successful!");
    }
  };

  // Button Configuration
  const buttons: ActionButtonProps[] = [
    { icon: <FaUser size={20} />, onClick: handleViewUserDetails },
    { icon: <IoMdAdd size={20} />, onClick: handleAddEvent },
    { icon: <RiLogoutCircleRFill size={20} />, onClick: handleLogout },
  ];

  return (
    <div className={styles.bottomNav}>
      {/* Back Button */}
      <motion.button
        whileHover="hover"
        whileTap="tap"
        onClick={() => onClickAction(headerActions.BACK)}
        className={styles.btns}
      >
        <HiOutlineArrowLeft size={20} />
      </motion.button>

      {/* Action Buttons (Dynamically Rendered) */}
      {buttons.map((btn, index) => (
        <ActionButton key={index} {...btn} hidden={isDrawerOpen} />
      ))}

      {/* Next Button */}
      <motion.button
        whileHover="hover"
        whileTap="tap"
        onClick={() => onClickAction(headerActions.NEXT)}
        className={styles.btns}
      >
        <HiOutlineArrowRight size={20} />
      </motion.button>
    </div>
  );
};

export default BottomNav;
