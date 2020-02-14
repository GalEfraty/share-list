import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    axios
      .get("/api/current_user")
      .then(response => setCurrentUser(response.data));
  };

  return (
    <authContext.Provider
      value={{
        currentUser,
        fetchUser
      }}
    >
      {children}
    </authContext.Provider>
  );
};
