import React from "react";
import styles from "./Video.module.css";
import SwitchButton from "../Helper/SwitchButton";

const Video = ({ video }) => {
  const [check, setCheck] = React.useState(false);
  const [videos, setVideos] = React.useState([]);

  const handleClick = () => {
    setCheck(!check);
  };

  if (!video) return null;
  return (
    <>
      <h1 className={styles.title}>{video.details.title}</h1>
      <iframe
        className={styles.video}
        src={`${video.src}?autoplay=1&enablejsapi=1&showinfo=0&controls=1`}
        title={video.details.title}
        frameBorder="0"
        allow="autoplay"
      ></iframe>
      <SwitchButton
        label="Marcar como já visto:"
        onClick={handleClick}
        checked={check}
      />
    </>
  );
};

export default Video;
