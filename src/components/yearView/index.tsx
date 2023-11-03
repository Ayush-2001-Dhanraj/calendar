import React from "react";
import styles from "./yearView.module.css";

interface YearViewInterface {
  calendarData: any;
}

export default function YearView({ calendarData }: YearViewInterface) {
  console.log("calendarData", calendarData);
  return <div className={styles.yearView}>Year View</div>;
}
