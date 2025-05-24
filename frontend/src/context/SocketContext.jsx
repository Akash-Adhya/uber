import React from "react";

const SocketContext = React.createContext({
  socket: null,
});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = React.useState(null);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};


export default SocketContext;