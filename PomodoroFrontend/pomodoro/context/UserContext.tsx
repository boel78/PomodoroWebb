"use client"
import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userSessions, setUserSessions] = useState(null);
  const login = (userData, sessionData) => {
    setUser(userData)
    setUserSessions(sessionData)  
    };
  const logout = () => setUser(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {      
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); 
    }
  }, [user]);
  

  return (
    <UserContext.Provider value={{ user, login, logout, userSessions }}>
      {children}
    </UserContext.Provider>
  );
};
