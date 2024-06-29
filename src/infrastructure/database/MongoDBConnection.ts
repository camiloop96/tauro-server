import { NODE_ENV, connectionDataDEV, connectionDataDPY } from "@config/env";
import { createRootUser } from "@modules/security/shared/rootUser";
import { logError, logSuccess } from "@utils/LogHandle/logsMessages";
import mongoose from "mongoose";

class MongoDBConnection {
  async connect(): Promise<void> {
    // connectionStringInitializer
    let connectionString: string = "";

    // Selects the connection data depending on the node env
    if (NODE_ENV === "deployment") {
      connectionString = `${connectionDataDPY.url}${connectionDataDPY.username}:${connectionDataDPY.password}${connectionDataDPY.cluster}/${connectionDataDPY.database}`;
    } else if (NODE_ENV === "development") {
      connectionString = `${connectionDataDEV.host}:${connectionDataDEV.port}/${connectionDataDEV.database}`;
    } else {
      const ERROR_MESSAGE = "Invalid NODE environment";
      logError(ERROR_MESSAGE);
      throw new Error(ERROR_MESSAGE);
    }

    // If connection mode is invalid, shows an error message
    if (connectionString.length === 0) {
      const ERROR_MESSAGE = "Invalid connection string";
      logError(ERROR_MESSAGE);
      throw new Error(ERROR_MESSAGE);
    }

    try {
      // Intentar conectar a la base de datos utilizando Mongoose
      await mongoose.connect(connectionString, {});
      logSuccess(`MongoDB established for ${NODE_ENV} environment`);
      // createRootUser();
    } catch (err) {
      logError(`Connection error at database: ${err}`);
    }
  }
}

export default new MongoDBConnection();
