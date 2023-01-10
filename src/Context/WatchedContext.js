import React from "react";

export const WatchedContext = React.createContext();

export const WatchedStorage = ({ children }) => {
  const [totalVideos, setTotalVideos] = React.useState(null);
  const [totalStorage, setTotalStorage] = React.useState(null);
  const [porcentagem, setPorcentagem] = React.useState(null);
  const [watched, setWatched] = React.useState({});

  React.useEffect(() => {
    const storage = localStorage.getItem("playlists")
      ? JSON.parse(localStorage.getItem("playlists"))
      : null;
    if (storage) setWatched(storage);
  }, []);

  React.useEffect(() => {
    // totalVideos -> total number of videos in the playlist
    // totalStorage -> videos saved by the user in localStorage
    if (totalVideos === 0) setPorcentagem(0);
    if (totalVideos > 0 && totalStorage >= 0) {
      const porcentagem = (totalStorage * 100) / totalVideos;
      // console.log(porcentagem);
      setPorcentagem(Math.ceil(porcentagem));
    }
  }, [totalVideos, totalStorage]);

  return (
    <WatchedContext.Provider
      value={{
        watched,
        porcentagem,
        setWatched,
        setTotalVideos,
        setTotalStorage,
      }}
    >
      {children}
    </WatchedContext.Provider>
  );
};
