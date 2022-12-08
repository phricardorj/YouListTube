import React from "react";
import styles from "./Video.module.css";

const Video = ({ video }) => {
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
    </>
  );
};

export default Video;
