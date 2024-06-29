import { config } from "dotenv";
import { Server, Socket } from "socket.io";

// Environment variables
config().parsed;
const { ORIGIN_CLIENT_DPY, ORIGIN_CLIENT_DEV, NODE_ENV } = process.env;

// Carga de variables de entorno
let originClient: string | undefined;
if (NODE_ENV === "development") {
  originClient = ORIGIN_CLIENT_DEV;
} else if (NODE_ENV === "deployment") {
  originClient = ORIGIN_CLIENT_DPY;
} else {
  throw new Error("Invalid NODE_ENV specified in environment variables");
}

// Componente del socket
class SocketServer {
  private io: Server;

  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: originClient,
      },
    });
    this.setupSocketEvents();
  }

  private setupSocketEvents(): void {
    this.io.on("connection", (socket: Socket) => {
      socket.on("updateOrderList", () => {
        this.io.emit("updateOrderList");
      });
    });
  }
  public getServer(): Server {
    return this.io;
  }
}

export default SocketServer;
