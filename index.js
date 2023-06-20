import dotenv from "dotenv";

import {
  createProductService,
  deleteProductService,
  getProductsService,
  updateProductService,
} from "./src/service/products-service.js";
import { auth } from "./src/auth/auth.js";

dotenv.config();

export const handler = async (event) => {
  console.log(event, "event");
  const token = await auth(event);

  if (!token) {
    const response = {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized" }),
    };
    return response;
  } else {
    try {
      const { httpMethod, path, body, resource } = event;
      if (path === "/products" || resource === "/products/{id}") {
        if (httpMethod === "POST") {
          const product = JSON.parse(body);
          const result = await createProductService(product);
          return result;
        } else if (httpMethod === "GET") {
          const result = await getProductsService();
          return result;
        } else if (httpMethod === "PUT") {
          const product = JSON.parse(body);
          const productId = event?.pathParameters?.id;
          const { name, description, price, quantity } = product;
          const result = await updateProductService(productId, name, description, price, quantity);
          return result;
        } else if (httpMethod === "DELETE") {
          const productId = event?.pathParameters?.id;
          const result = await deleteProductService(productId);
          return result;
        } else {
          const response = {
            statusCode: 404,
            body: JSON.stringify({ message: "Operation not found" }),
          };
          return response;
        }
      }
    } catch (error) {
      console.log(error);
      const response = {
        statusCode: 400,
        body: JSON.stringify({ message: error.message }),
      };
      return response;
    }
  }
};
