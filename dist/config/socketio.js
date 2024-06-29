"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const socket_io_1 = require("socket.io");
// Environment variables
(0, dotenv_1.config)().parsed;
const { ORIGIN_CLIENT_DPY, ORIGIN_CLIENT_DEV, NODE_ENV } = process.env;
// Carga de variables de entorno
let originClient;
if (NODE_ENV === "development") {
    originClient = ORIGIN_CLIENT_DEV;
}
else if (NODE_ENV === "deployment") {
    originClient = ORIGIN_CLIENT_DPY;
}
else {
    throw new Error("Invalid NODE_ENV specified in environment variables");
}
// Componente del socket
class SocketServer {
    constructor(server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: originClient,
            },
        });
        this.setupSocketEvents();
    }
    setupSocketEvents() {
        this.io.on("connection", (socket) => {
            socket.on("updateOrderList", () => {
                this.io.emit("updateOrderList");
            });
        });
    }
    getServer() {
        return this.io;
    }
}
exports.default = SocketServer;
