import React from "react";

export const ThemeContext = React.createContext();

export const ThemeStorage = ({ children }) => {
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = React.useState(
    isBrowserDefaultDark() ? "dark" : "light"
  );

  React.useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) setTheme(localTheme);
  }, []);

  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark";
    const newTheme = isCurrentDark ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
