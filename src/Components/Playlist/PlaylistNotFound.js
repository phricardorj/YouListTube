import React from "react";
import { Link } from "react-router-dom";
import styles from "./PlaylistNotFound.module.css";

const PlaylistNotFound = () => {
  return (
    <div className={styles.error}>
      <h1>Ops 💥! Playlist não encontrada!</h1>
      <p>Verifique o código da Playlist informado e tente novamente.</p>
      <Link to="/" className={styles.voltar}>
        Voltar
      </Link>
    </div>
  );
};

export default PlaylistNotFound;
