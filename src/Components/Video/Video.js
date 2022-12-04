import React from "react";
import MenuVideo from "./MenuVideo";
import VideoContent from "./VideoContent";
import styles from "./Video.module.css";
import { useParams, Link } from "react-router-dom";

function Video() {
  const { playlistId } = useParams();
  const [data, setData] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [video, setVideo] = React.useState(null);
  const [laoding, setLaoding] = React.useState(false);
  const [videoDefault, setVideoDefault] = React.useState(null);
  const [counter, setCounter] = React.useState(1);
  const [buttonProximo, setButtonProximo] = React.useState(false);

  const baseUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.REACT_APP_API_KEY}&part=snippet`;
  const maxResults = 10;

  React.useEffect(() => {
    const getJson = async (url) => {
      setLaoding(true);
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setData(json);
      }
      setLaoding(false);
    };
    getJson(`${baseUrl}&maxResults=${maxResults}&playlistId=${playlistId}`);
  }, []);

  React.useEffect(() => {
    if (data && !videoDefault) {
      setVideoDefault({
        index: 0,
        src: `https://www.youtube.com/embed/${data.items[0].snippet.resourceId.videoId}`,
        details: data.items[0].snippet,
      });
    }
  }, [data, videoDefault]);

  const getDataByPage = async (pageToken) => {
    setLaoding(true);
    const url = pageToken
      ? `${baseUrl}&maxResults=${maxResults}&playlistId=${playlistId}&pageToken=${pageToken}`
      : `${baseUrl}&maxResults=${maxResults}&playlistId=${playlistId}`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setData(json);
    }
    setLaoding(false);
  };

  const nextPage = async () => {
    setPage(page + 1);
    await getDataByPage(data.nextPageToken);
    setCounter(1);
    setButtonProximo(false);
  };

  const prevPage = async () => {
    setPage(page - 1);
    await getDataByPage(data.prevPageToken);
    setButtonProximo(false);
  };

  return (
    <>
      {laoding && <p className={styles.carregando}>Carregando</p>}
      {data && (
        <div className={styles.wrapper}>
          <VideoContent video={video ? video : videoDefault} />
          <MenuVideo
            data={data}
            page={page}
            video={video}
            nextPage={nextPage}
            prevPage={prevPage}
            setVideo={setVideo}
            maxResults={maxResults}
            setCounter={setCounter}
            buttonProximo={buttonProximo}
            setButtonProximo={setButtonProximo}
          />
        </div>
      )}
      {!data && !laoding && (
        <div className={styles.error}>
          <h1>Ops! Playlist não encontrada!</h1>
          <p>Verifique o código da Playlist informado e tente novamente.</p>
          <Link to="/" className={styles.voltar}>
            Voltar
          </Link>
        </div>
      )}
    </>
  );
}

export default Video;
