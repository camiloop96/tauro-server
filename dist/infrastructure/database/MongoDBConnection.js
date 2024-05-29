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
const env_1 = require("@config/env");
const rootUser_1 = require("@modules/security/shared/rootUser");
const logsMessages_1 = require("@utils/LogHandle/logsMessages");
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDBConnection {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            // connectionStringInitializer
            let connectionString = "";
            // Selects the connection data depending on the node env
            if (env_1.NODE_ENV === "deployment") {
                connectionString = `${env_1.connectionDataDPY.url}${env_1.connectionDataDPY.username}:${env_1.connectionDataDPY.password}${env_1.connectionDataDPY.cluster}/${env_1.connectionDataDPY.database}`;
            }
            else if (env_1.NODE_ENV === "development") {
                connectionString = `${env_1.connectionDataDEV.host}:${env_1.connectionDataDEV.port}/${env_1.connectionDataDEV.database}`;
            }
            else {
                const ERROR_MESSAGE = "Invalid NODE environment";
                (0, logsMessages_1.logError)(ERROR_MESSAGE);
                throw new Error(ERROR_MESSAGE);
            }
            // If connection mode is invalid, shows an error message
            if (connectionString.length === 0) {
                const ERROR_MESSAGE = "Invalid connection string";
                (0, logsMessages_1.logError)(ERROR_MESSAGE);
                throw new Error(ERROR_MESSAGE);
            }
            try {
                // Intentar conectar a la base de datos utilizando Mongoose
                yield mongoose_1.default.connect(connectionString, {});
                (0, logsMessages_1.logSuccess)(`MongoDB established for ${env_1.NODE_ENV} environment`);
                (0, rootUser_1.createRootUser)();
            }
            catch (err) {
                (0, logsMessages_1.logError)(`Connection error at database: ${err}`);
            }
        });
    }
}
exports.default = new MongoDBConnection();
