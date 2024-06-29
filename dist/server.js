"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IO = void 0;
const dotenv_1 = require("dotenv");
const socketio_1 = __importDefault(require("./config/socketio"));
const logsMessages_1 = require("./utils/LogHandle/logsMessages");
const MongoDBConnection_1 = __importDefault(require("./infrastructure/database/MongoDBConnection"));
const env_1 = require("./config/env");
const app_1 = __importDefault(require("./app"));
const CreateRootUserController_1 = require("./modules/security/infrastructure/controllers/user/CreateRootUserController");
// Import de variables de entorno
(0, dotenv_1.config)();
// Escuchar el servidor en el puerto especificado
let server = app_1.default.listen(env_1.PORT, () => {
    (0, logsMessages_1.logSuccess)(`Simora App running at port ${env_1.PORT} at ${env_1.NODE_ENV} environment`);
});
// Manejar errores de servidor
server.on("error", (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const BIND = typeof env_1.PORT === "string" ? "Pipe " + env_1.PORT : "Port " + env_1.PORT;
    // Manejar diferentes tipos de errores
    switch (error.code) {
        case "EACCES":
            (0, logsMessages_1.logError)(`${BIND} requires elevated privileges`);
            process.exit(1);
        case "EADDRINUSE":
            (0, logsMessages_1.logError)(`${BIND} is already in use`);
            break;
        default:
            throw error;
    }
});
// Connection to MongoDB database
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield MongoDBConnection_1.default.connect();
        }
        catch (error) {
            (0, logsMessages_1.logError)(`Connection error at database: ${error}`);
        }
    });
}
// Call to connection at database
connectDB();
const InitializeRootData = () => __awaiter(void 0, void 0, void 0, function* () {
    // Root user
    const createRootUser = new CreateRootUserController_1.CreateRootUserController();
    try {
        yield createRootUser.execute();
    }
    catch (error) {
        (0, logsMessages_1.logError)(`Error creating root data`);
    }
});
InitializeRootData();
// Websocket config
const socketServer = new socketio_1.default(server);
exports.IO = socketServer.getServer();
(0, logsMessages_1.logSuccess)(`Socket server connected successfully at ${env_1.NODE_ENV} environment`);
