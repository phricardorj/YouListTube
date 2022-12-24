import React from "react";

export const WatchedContext = React.createContext();

export const WatchedStorage = ({ children }) => {
  const [numResults, setNumResults] = React.useState(null);
  const [watched, setWatched] = React.useState({
    playlistId: "",
    id: [],
  });

  React.useEffect(() => {
    const storage = localStorage.getItem("watched")
      ? JSON.parse(localStorage.getItem("watched"))
      : null;
    if (storage) setWatched(storage);
  }, []);

  return (
    <WatchedContext.Provider value={{ watched, setWatched, setNumResults }}>
      {children}
    </WatchedContext.Provider>
  );
};
