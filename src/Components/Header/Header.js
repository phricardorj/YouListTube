import React from "react";
import styles from "./Header.module.css";
import { ThemeContext } from "../../Context/ThemeContext";

const Header = () => {
  const { handleThemeChange } = React.useContext(ThemeContext);

  return (
    <div className={styles.header}>
      <button className={styles.buttton} onClick={handleThemeChange}>
        Mudar Tema
      </button>
    </div>
  );
};

export default Header;
