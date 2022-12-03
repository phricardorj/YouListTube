import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [value, setValue] = React.useState("");
  const input = React.useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value == "") {
      alert("Informe o código da playlist!");
      input.current.focus();
      return null;
    }
    navigate(`/playlist/${value}`);
  };

  return (
    <div className={styles.container}>
      <h1>YouListTube - Playlist Youtube Player</h1>
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
        <button>Reproduzir Playlist</button>
      </form>
    </div>
  );
};

export default Home;
