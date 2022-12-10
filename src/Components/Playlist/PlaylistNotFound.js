import React from "react";
import { Link } from "react-router-dom";
import styles from "./PlaylistNotFound.module.css";
import infoCode from "../../Assets/infoCode.png";

const PlaylistNotFound = () => {
  return (
    <div className={styles.error}>
      <div className={styles.container}>
        <h1>Ops 💥! Playlist não encontrada!</h1>
        <p>Verifique o código da Playlist informado e tente novamente.</p>
        <img
          src={infoCode}
          alt="Imagem com informação de como achar o código da Playlist"
          className={styles.infoCode}
        />
        <Link to="/" className={`btn-default ${styles.btn}`}>
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default PlaylistNotFound;
