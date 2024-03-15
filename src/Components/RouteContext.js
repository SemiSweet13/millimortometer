import React, { createContext, useState, useContext } from 'react';

const RouteContext = createContext();

export const useRoute = () => useContext(RouteContext);

export const RouteProvider = ({ children }) => {
  const [route, setRoute] = useState(null);
  //console.log('IN ROUTE CONTEXT TESTING NEW ROUTE CONTEXT LIFT:', route) //testing the context lift

  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      {children}
    </RouteContext.Provider>
  );
};
