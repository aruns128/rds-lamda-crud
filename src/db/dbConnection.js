import mysql from "mysql2/promise.js";
import { getSecret } from "./getSecrets.js";

export const dbConnection = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Retrieve database credentials from Secrets Manager
      const secretData = await getSecret();

      const dbUsername = secretData.username;
      const dbPassword = secretData.password;
      const dbHost = secretData.host;
      const dbPort = secretData.port;
      const database = secretData.dbInstanceIdentifier;

      // Create a connection to the RDS instance
      const connection = mysql.createConnection({
        host: dbHost,
        user: dbUsername,
        port: dbPort,
        password: dbPassword,
        database: database,
      });

      resolve(connection);
    } catch (error) {
      console.error("[dbConnection]:connection issue", error);
      reject("[dbConnection]:connection issue", error);
    }
  });
};
