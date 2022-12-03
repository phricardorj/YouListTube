import React from "react";
import styles from "./MenuVideo.module.css";

function MenuVideo({
  data,
  page,
  nextPage,
  prevPage,
  setVideo,
  video,
  setCounter,
  setButtonProximo,
  buttonProximo,
}) {
  const [nextVideo, setNextVideo] = React.useState({
    index: 1,
    src: `https://www.youtube.com/embed/${data.items[1].snippet.resourceId.videoId}`,
    details: data.items[1].snippet,
  });

  React.useEffect(() => {
    if (video) {
      let src;
      const { index } = video;
      if (data.items.length > index + 1) {
        const { snippet } = data.items[index + 1];
        src = `https://www.youtube.com/embed/${snippet.resourceId.videoId}`;
        if (nextVideo.src !== src) {
          setNextVideo((s) => ({
            ...s,
            index: index + 1,
            src: src,
            details: snippet,
          }));
        }
      }
    }
  }, [video]);

  React.useEffect(() => {
    setNextVideo((s) => ({
      ...s,
      index: 1,
      src: `https://www.youtube.com/embed/${data.items[1].snippet.resourceId.videoId}`,
      details: data.items[1].snippet,
    }));
    setVideo((s) => ({
      ...s,
      index: 0,
      src: `https://www.youtube.com/embed/${data.items[0].snippet.resourceId.videoId}`,
      details: data.items[0].snippet,
    }));
  }, [data]);

  const handleNextVideoBtn = () => {
    const lastPage = Math.ceil(
      data.pageInfo.totalResults / data.pageInfo.resultsPerPage
    );

    if (page != lastPage && video.index + 1 !== data.items.length) {
      setVideo(nextVideo);
      setButtonProximo(false);
    } else if (page === lastPage && video.index + 1 !== data.items.length) {
      setVideo(nextVideo);
      setButtonProximo(true);
    } else if (page === 1 && video.index + 1 === data.items.length) {
      setButtonProximo(false);
      nextPage(data.nextPageToken);
    } else {
      setVideo(nextVideo);
      setButtonProximo(true);
    }
  };

  return (
    <>
      {nextVideo && (
        <button
          className={styles.btnProximoVideo}
          onClick={handleNextVideoBtn}
          disabled={buttonProximo}
        >
          Próximo Vídeo
        </button>
      )}
      <ul className={styles.ul}>
        {data.items.map((item, index) => (
          <li
            key={item.id}
            onClick={() => {
              setVideo({
                index: index,
                src: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
                details: item.snippet,
              });
              setCounter(index + 1);
            }}
          >
            {item.snippet.title}
          </li>
        ))}
      </ul>
      <div className={styles.btnGroup}>
        {page > 1 && <button onClick={prevPage}>Voltar Página</button>}
        {page < data.pageInfo.totalResults / data.pageInfo.resultsPerPage && (
          <button onClick={nextPage}>Próxima Página</button>
        )}
      </div>
      <p className={styles.page}>
        Página: {page} /{" "}
        {Math.ceil(data.pageInfo.totalResults / data.pageInfo.resultsPerPage)}
      </p>
    </>
  );
}

export default MenuVideo;
