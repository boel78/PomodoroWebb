"use client"
import { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  algoritmsetting: string;
  preferredBreak: string;
  preferredPomodoro: string;
  streak: number;
  userName: string;
  id: string;
  email: string;
}

interface Session {
  id: string;
  dateCreated: string;
  timeSpent: number;
  totalExtraTime: string;
  tasksCompleted: number;
  type: string;
}

interface UserContextType {
  user: User | null;
  userSessions: Session[] | null;
  login: (userData: User, sessionData: Session[]) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setUserSessions: (sessions: Session[]) => void;
}

const defaultContext: UserContextType = {
  user: null,
  userSessions: null,
  login: () => {},
  logout: () => {},
  setUser: () => {},
  setUserSessions: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }:UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userSessions, setUserSessions] = useState<Session[] | null>(null);
  const login = (userData: User, sessionData: Session[]) => {
    setUser(userData)
    setUserSessions(sessionData)  
    
    };
  const logout = () => {
    setUser(null)
    if(localStorage.getItem("user")){localStorage.removeItem("user")}
    if(localStorage.getItem("sessions")){localStorage.removeItem("sessions")}
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
  }, [user, userSessions]);
  

  return (
    <UserContext.Provider value={{ user, login, logout, userSessions, setUserSessions, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
