"use client"
import { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userSessions, setUserSessions] = useState(null);
  const login = (userData, sessionData) => {
    setUser(userData)
    setUserSessions(sessionData)
    console.log(userData);
    console.log(sessionData)
    
    };
  const logout = () => setUser(null);
  

  return (
    <UserContext.Provider value={{ user, login, logout, userSessions }}>
      {children}
    </UserContext.Provider>
  );
};
