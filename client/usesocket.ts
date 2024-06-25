"use client";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io("http://localhost:3001");
    setSocket(socketIo);
    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
