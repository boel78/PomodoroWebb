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
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("sessions")
  };

    useEffect(() => {

      
    },[userSessions])


  //Local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const userSessionsls = localStorage.getItem("sessions");
    if(userSessionsls){
      setUserSessions(JSON.parse(userSessionsls))
    }
  }, []);
  useEffect(() => {
    if (user) {      
      localStorage.setItem("user", JSON.stringify(user));
      if(userSessions){
        localStorage.setItem("sessions", JSON.stringify(userSessions));
      }
    } else {
      localStorage.removeItem("user"); 
    }
  }, [user]);
  

  return (
    <UserContext.Provider value={{ user, login, logout, userSessions, setUserSessions, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
