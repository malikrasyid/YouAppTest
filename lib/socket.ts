import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const socket = io(SOCKET_URL, {
  autoConnect: false, 
  auth: {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
  },
});