import React from "react";
import styles from "./SwitchButton.module.css";

const SwitchButton = ({ checked, label, ...props }) => {
  return (
    <>
      <label className={styles.label}>
        {label}
        <div className={styles.switch}>
          <input type="checkbox" checked={checked} {...props}></input>
          <span className={`${styles.slider} ${styles.round}`}></span>
        </div>
      </label>
    </>
  );
};

export default SwitchButton;
