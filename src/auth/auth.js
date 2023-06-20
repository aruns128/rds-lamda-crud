import * as jwt from "jsonwebtoken";
import { getSecret } from "../db/getSecrets.js";

export const auth = async (event) => {
  try {
    const secretData = await getSecret();
    const JWT_SECRET_KEY = secretData.jwtSecretKey;
    console.log("[auth]:JWT_SECRET_KEY:", JWT_SECRET_KEY);
    const token = event?.headers?.Authorization;

    if (!token) {
      return false;
    } else {
      return true;
    }
    // jwt.verify(token, JWT_SECRET_KEY, (err, userData) => {
    //   if (err) {
    //     console.log("[auth]: Error", err);
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
  } catch (error) {
    console.error("[auth] Error:", error);
    return false;
  }
};
