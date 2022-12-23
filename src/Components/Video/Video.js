import React from "react";
import styles from "./Video.module.css";
import SwitchButton from "../Helper/SwitchButton";
import { WatchedContext } from "../../Context/WatchedContext";

const Video = ({ video, playlistId }) => {
  const { watched, setWatched } = React.useContext(WatchedContext);
  const [check, setCheck] = React.useState(false);

  React.useEffect(() => {
    if (watched && video) {
      const checked = watched.id.includes(video.snippet.resourceId.videoId);
      setCheck(checked);
    }
  }, [video]);

  const handleVideoCheck = () => {
    setCheck(!check);
    if (!check) {
      const data = { ...watched };
      data.id.push(video.snippet.resourceId.videoId);
      setWatched(data);
      localStorage.setItem("watched", JSON.stringify(data));
    } else {
      const data = { ...watched };
      data.id = data.id.filter((el) => el !== video.snippet.resourceId.videoId);
      setWatched(data);
      localStorage.setItem("watched", JSON.stringify(data));
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
        label="Marcar como assistido:"
        onChange={handleVideoCheck}
        color="#b1e458"
        checked={check}
      />
    </>
  );
};

export default Video;
