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
    if (watched) {
      const json = JSON.parse(watched);
      const checked = json.id.includes(video.id);
      if (video) setCheck(checked);
      setVideos(json);
    }
  }, [video]);

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
      <h1 className={styles.title}>{video.snippet.title}</h1>
      <iframe
        src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}?autoplay=1`}
        title={video.snippet.title}
        className={styles.video}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <SwitchButton
        label="Marcar como já visto:"
        onChange={handleVideoCheck}
        checked={check}
      />
    </>
  );
};

export default Video;
