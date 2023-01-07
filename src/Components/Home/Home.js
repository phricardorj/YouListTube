import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import infoCode from "../../Assets/infoCode.png";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import logo from "../../Assets/youlisttube.png";

const Home = () => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);
  const input = React.useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === "" || value.length <= 10) {
      setError("⚠️ Informe um código da playlist válido!");
      input.current.focus();
      return null;
    }
    const playlistId = value.trim().replace(/\s/g, "");
    navigate(`/playlist/${playlistId}`);
  };

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <img src={logo} alt="Logo YouListTube" />
            <p>Playlist Youtube Player</p>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="playlist">Digite o código da playlist:</label>
            <input
              type="text"
              name="playlist"
              id="playlist"
              ref={input}
              placeholder="PLcirGkCPmbmEgDAsRiu9WyOGCAVEWPwhs"
              value={value}
              onChange={({ target }) => setValue(target.value)}
            />
            {error && <p>{error}</p>}
            <button className="btn-default">▶️ Reproduzir Playlist</button>
            <img
              src={infoCode}
              alt="Imagem com informação de como achar o código da Playlist"
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
