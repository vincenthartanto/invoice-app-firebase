import React, { createContext } from "react";
import { useState } from "react";
export const darkModeContext = createContext(null);
export default function DarkModeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <darkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </darkModeContext.Provider>
  );
}
