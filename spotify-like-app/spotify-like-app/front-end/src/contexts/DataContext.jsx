import { createContext, useState } from "react";

const DataContext = createContext();

export function DataContextProvider({ children }) {
  const [artistsList, setArtistsList] = useState([]);

  return (
    <DataContext.Provider value={{ artistsList, setArtistsList }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
