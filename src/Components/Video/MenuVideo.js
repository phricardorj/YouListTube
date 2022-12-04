import React from "react";
import styles from "./MenuVideo.module.css";

function MenuVideo({
  data,
  page,
  nextPage,
  prevPage,
  setVideo,
  video,
  setButtonProximo,
  buttonProximo,
  maxResults,
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
  };

  return (
    <>
      {/* {nextVideo && (
        <button
          className={styles.btnProximoVideo}
          onClick={handleNextVideoBtn}
          disabled={buttonProximo}
        >
          Próximo Vídeo
        </button>
      )} */}
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
