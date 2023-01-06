import React from "react";

export const WatchedContext = React.createContext();

export const WatchedStorage = ({ children }) => {
  const [numResults, setNumResults] = React.useState(null);
  const [watched, setWatched] = React.useState({});

  React.useEffect(() => {
    const storage = localStorage.getItem("playlists")
      ? JSON.parse(localStorage.getItem("playlists"))
      : null;
    if (storage) setWatched(storage);
  }, []);

  return (
    <WatchedContext.Provider value={{ watched, setWatched, setNumResults }}>
      {children}
    </WatchedContext.Provider>
  );
};
