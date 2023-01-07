import React from "react";
import styles from "./Header.module.css";
import { ThemeContext } from "../../Context/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import SwitchButton from "../Helper/SwitchButton";

const Header = () => {
  const { handleThemeChange, theme } = React.useContext(ThemeContext);
  const { pathname } = useLocation();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        {pathname !== "/" && (
          <Link to="/" className="btn-default">
            Página Inicial
          </Link>
        )}

        <SwitchButton
          label={theme !== "light" ? "Tema Escuro (ON)" : "Tema Escuro (OFF)"}
          checked={theme !== "light"}
          onChange={handleThemeChange}
        />
      </div>
    </div>
  );
};

export default Header;
