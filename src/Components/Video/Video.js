import React from "react";
import styles from "./Video.module.css";
import SwitchButton from "../Helper/SwitchButton";

const Video = ({ video, playlistId }) => {
  const [check, setCheck] = React.useState(false);
  const [videos, setVideos] = React.useState({
    playlistId: playlistId,
    id: [],
  });

  React.useEffect(() => {
    const watched = localStorage.getItem("watched");
    if (watched) setVideos(JSON.parse(watched));
    const checked = videos.id.includes(video.id);
    setCheck(checked);
  }, [video.id, videos]);

  const handleVideoCheck = () => {
    setCheck(!check);
    if (!check) {
      videos.id.push(video.id);
      setVideos(videos);
      localStorage.setItem("watched", JSON.stringify(videos));
    } else {
      videos.id = videos.id.filter((el) => el !== video.id);
      setVideos(videos);
      localStorage.setItem("watched", JSON.stringify(videos));
    }
  };

  if (!video) return null;
  return (
    <>
      <h1 className={styles.title}>{video.details.title}</h1>
      <iframe
        className={styles.video}
        src={`${video.src}?autoplay=1&controls=1&rel=0`}
        title={video.details.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <SwitchButton
        label="Marcar como já visto:"
        onChange={() => handleVideoCheck()}
        checked={check}
      />
    </>
  );
};

export default Video;
