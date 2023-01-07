import React from "react";
import styles from "./ProgessBar.module.css";

const ProgessBar = ({ porcentagem }) => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>{porcentagem}% Assistidos</div>
      <div className={styles.progress}>
        <div className={styles.bar} style={{ width: `${porcentagem}%` }}></div>
      </div>
    </div>
  );
};

export default ProgessBar;
