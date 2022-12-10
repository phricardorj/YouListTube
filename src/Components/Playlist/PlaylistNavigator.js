import React from "react";
import styles from "./PlaylistNavigator.module.css";
import Loading from "../Helper/Loading";

function PlaylistNavigator({
  data,
  setData,
  page,
  setVideo,
  setPage,
  playlistId,
  baseUrl,
  maxResults,
}) {
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
    await getDataByPage(data.nextPageToken);
  };

  const prevPage = async () => {
    setPage(page - 1);
    await getDataByPage(data.prevPageToken);
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
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
