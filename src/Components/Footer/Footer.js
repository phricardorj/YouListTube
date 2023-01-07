import React from "react";
import styles from "./Footer.module.css";
import logo from "../../Assets/youlisttube.png";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <img className={styles.logo} src={logo} alt="YouTubeList Logo"></img>
      <p className={styles.text}>
        Feito com ❤️ por{" "}
        <a href="https://links.phricardo.com.br/" target="_blank" noreferrer>
          @phricardorj
        </a>
      </p>
    </div>
  );
};

export default Footer;
