import React from "react";
import styles from "./Video.module.css";
import YouTube from "@u-wave/react-youtube";
import SwitchButton from "../Helper/SwitchButton";
import { WatchedContext } from "../../Context/WatchedContext";

const Video = ({ video, playlistId }) => {
  const { watched, setWatched } = React.useContext(WatchedContext);
  const [check, setCheck] = React.useState(false);

  React.useEffect(() => {
    if (!watched[playlistId]) setWatched({ ...watched, [playlistId]: [] });
  }, []);

  React.useEffect(() => {
    if (watched[playlistId] && video) {
      const checked = watched[playlistId].includes(
        video.snippet.resourceId.videoId
      );
      setCheck(checked);
    }
  }, [video]);

  const handleVideoCheck = () => {
    setCheck(!check);
    if (!check) {
      const newWatched = {
        ...watched,
        [playlistId]: [
          ...watched[playlistId],
          video.snippet.resourceId.videoId,
        ],
      };
      setWatched(newWatched);
      localStorage.setItem("playlists", JSON.stringify(newWatched));
    } else {
      const newWatched = {
        ...watched,
        [playlistId]: watched[playlistId].filter(
          (str) => str !== video.snippet.resourceId.videoId
        ),
      };
      setWatched(newWatched);
      localStorage.setItem("playlists", JSON.stringify(newWatched));
    }
  };

  if (!video) return null;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{video.snippet.title}</h1>
      <YouTube
        video={video.snippet.resourceId.videoId}
        autoplay
        className={styles.video}
        onEnd={() => alert("Em breve, reprodução automática! :)")}
      />
      <SwitchButton
        label="Marcar como assistido:"
        onChange={handleVideoCheck}
        color="#b1e458"
        checked={check}
      />
    </div>
  );
};

export default Video;
