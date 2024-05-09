"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSocketServer = void 0;
const dotenv_1 = require("dotenv");
const socket_io_1 = require("socket.io");
const createSocketServer = (server) => {
    // Variables de entorno
    (0, dotenv_1.config)().parsed;
    // Carga de variables de entorno
    const { ORIGIN_CLIENT_DPY, ORIGIN_CLIENT_DEV, MODE } = process.env;
    let originClient;
    if (MODE === "development") {
        originClient = ORIGIN_CLIENT_DEV;
    }
    else if (MODE === "deploy") {
        originClient = ORIGIN_CLIENT_DPY;
    }
    else {
        return null;
    }
    const io = new socket_io_1.Server(server, {
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
exports.createSocketServer = createSocketServer;
