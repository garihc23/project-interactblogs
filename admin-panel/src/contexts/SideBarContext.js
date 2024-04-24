// src/contexts/SideBarContext.js
import React, { createContext, useContext, useState } from 'react';

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <SideBarContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error('useSideBar must be used within a SideBarProvider');
  }
  return context;
};
