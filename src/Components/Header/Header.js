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
      {pathname !== "/" && (
        <Link to="/" className="btn-default">
          Página Inicial
        </Link>
      )}

      <p>
        Gostou? Deixe uma ⭐ no{" "}
        <a
          href="https://github.com/phricardorj/YouListTube"
          target="_blank"
          rel="noopener noreferrer"
        >
          repositório
        </a>
      </p>

      <SwitchButton
        label={"Tema Escuro 🌙"}
        checked={theme !== "light"}
        onChange={handleThemeChange}
      />
    </div>
  );
};

export default Header;
