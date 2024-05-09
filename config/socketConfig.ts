import { config } from "dotenv";
import { Server } from "socket.io";

export const createSocketServer = (server: any) => {
  // Variables de entorno
  config().parsed;

  // Carga de variables de entorno
  const { ORIGIN_CLIENT_DPY, ORIGIN_CLIENT_DEV, MODE } = process.env;

  let originClient;

  if (MODE === "development") {
    originClient = ORIGIN_CLIENT_DEV;
  } else if (MODE === "deploy") {
    originClient = ORIGIN_CLIENT_DPY;
  } else {
    return null;
  }

  const io = new Server(server, {
    cors: {
      origin: originClient,
    },
  });

  io.on("connection", (socket) => {
    socket.on("updateOrderList", () => {
      io.emit("updateOrderList");
    });
  });
  return io;
};
