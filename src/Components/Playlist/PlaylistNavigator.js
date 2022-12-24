import React from "react";
import styles from "./PlaylistNavigator.module.css";
import Loading from "../Helper/Loading";
import { WatchedContext } from "../../Context/WatchedContext";

function PlaylistNavigator({
  data,
  setData,
  page,
  setVideo,
  setPage,
  playlistId,
  baseUrl,
  maxResults,
  playingNow,
}) {
  const { watched } = React.useContext(WatchedContext);
  const [loading, setLoading] = React.useState(false);

  const getDataByPage = async (pageToken) => {
    setLoading(true);
    const url = pageToken
      ? `${baseUrl}&maxResults=${maxResults}&playlistId=${playlistId}&pageToken=${pageToken}`
      : `${baseUrl}&maxResults=${maxResults}&playlistId=${playlistId}`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setData(json);
    }
    setLoading(false);
  };

  const nextPage = async () => {
    setPage(page + 1);
    if (data.nextPageToken) await getDataByPage(data.nextPageToken);
  };

  const prevPage = async () => {
    setPage(page - 1);
    if (data.prevPageToken) await getDataByPage(data.prevPageToken);
  };

  const isPlayingNow = (videoId) => {
    return playingNow && playingNow === videoId ? styles.playingNow : undefined;
  };

  const isAlreadyWatched = (videoId) => {
    if (watched.id && watched.id.includes(videoId)) return styles.saved;
    return undefined;
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <ul className={styles.ul}>
          {data.items.map((item, index) => (
            <li
              key={item.id}
              className={`${isPlayingNow(
                item.snippet.resourceId.videoId
              )} ${isAlreadyWatched(item.snippet.resourceId.videoId)}`}
              onClick={() => setVideo(item)}
            >
              <img
                src={
                  Object.keys(item.snippet.thumbnails).length > 0
                    ? item.snippet.thumbnails.medium.url
                    : `https://via.placeholder.com/320x180.png?text=${item.snippet.title}`
                }
                alt={item.snippet.title}
                className={styles.thumbnail}
              />
              {item.snippet.title}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.btnGroup}>
        {page > 1 && (
          <button className="btn-default" onClick={prevPage}>
            Voltar Página
          </button>
        )}
        {page < data.pageInfo.totalResults / data.pageInfo.resultsPerPage && (
          <button className="btn-default" onClick={nextPage}>
            Próxima Página
          </button>
        )}
      </div>
      <p className={styles.page}>
        Página: {page} /{" "}
        {Math.ceil(data.pageInfo.totalResults / data.pageInfo.resultsPerPage)}
      </p>
    </>
  );
}

export default PlaylistNavigator;
