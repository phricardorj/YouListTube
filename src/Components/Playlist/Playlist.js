import React from "react";
import PlaylistNavigator from "./PlaylistNavigator";
import Video from "../Video/Video";
import { useParams } from "react-router-dom";
import styles from "./Playlist.module.css";
import PlaylistNotFound from "./PlaylistNotFound";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Playlist() {
  const { playlistId } = useParams();
  const [data, setData] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [video, setVideo] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const baseUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.REACT_APP_API_KEY}&part=snippet`;
  const maxResults = 10;

  React.useEffect(() => {
    const getPlaylistData = async (url) => {
      setLoading(true);
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setData(json);
        setVideo({
          id: json.items[0].snippet.resourceId.videoId,
          src: `https://www.youtube.com/embed/${json.items[0].snippet.resourceId.videoId}`,
          details: json.items[0].snippet,
        });
      }
      setLoading(false);
    };
    getPlaylistData(
      `${baseUrl}&maxResults=${maxResults}&playlistId=${playlistId}`
    );
  }, [baseUrl, playlistId]);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        {loading && <div className={styles.skeleton}></div>}
        {data && !loading && (
          <>
            <div className={styles.container}>
              <Video video={video} />
            </div>
            <div className={styles.container}>
              <PlaylistNavigator
                data={data}
                page={page}
                playlistId={playlistId}
                baseUrl={baseUrl}
                maxResults={maxResults}
                setPage={setPage}
                setVideo={setVideo}
                setData={setData}
              />
            </div>
          </>
        )}
      </div>

      {!data && !loading && <PlaylistNotFound />}
      <Footer />
    </>
  );
}

export default Playlist;
