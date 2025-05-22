// React context for managing user authentication state and info.
import React, { createContext, useState } from 'react';

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  // Store user info in state and provide setter
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
  }); 

  return (
    <userDataContext.Provider value={{ user, setUser }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;