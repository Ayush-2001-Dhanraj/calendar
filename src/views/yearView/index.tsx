import React from "react";
import styles from "./yearView.module.css";
import { YearProps } from "../../common/interfaces";

export default function YearView({ year }: YearProps) {
  return <div className={styles.yearView}>Year View</div>;
}
