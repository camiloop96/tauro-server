import { config } from "dotenv";
import SocketServer from "@config/socketio";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import MongoDBConnection from "@infrastructure/database/MongoDBConnection";
import { PORT, NODE_ENV } from "@config/env";
import APP from "./app";
import { CreateRootUserController } from "@modules/security/infrastructure/controllers/user/CreateRootUserController";

// Import de variables de entorno
config();

// Escuchar el servidor en el puerto especificado
let server = APP.listen(PORT, () => {
  logSuccess(`Simora App running at port ${PORT} at ${NODE_ENV} environment`);
});

// Manejar errores de servidor
server.on("error", (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const BIND = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // Manejar diferentes tipos de errores
  switch (error.code) {
    case "EACCES":
      logError(`${BIND} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      logError(`${BIND} is already in use`);
      break;
    default:
      throw error;
  }
});

// Connection to MongoDB database
async function connectDB() {
  try {
    await MongoDBConnection.connect();
  } catch (error) {
    logError(`Connection error at database: ${error}`);
  }
}

// Call to connection at database
connectDB();

const InitializeRootData = async () => {
  // Root user
  const createRootUser = new CreateRootUserController();
  try {
    await createRootUser.execute();
  } catch (error) {
    logError(`Error creating root data`);
  }
};

InitializeRootData();

// Websocket config
const socketServer = new SocketServer(server);
export const IO = socketServer.getServer();
logSuccess(`Socket server connected successfully at ${NODE_ENV} environment`);
