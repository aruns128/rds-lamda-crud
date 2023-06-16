import AWS from "aws-sdk";
import dotenv from "dotenv";

import { createProduct, deleteProduct, getProducts, updateProduct } from "./productsDB.js";

dotenv.config();

const aws_region = process.env.AWSregion;

AWS.config.update({
  region: aws_region,
});

export const handler = async (event) => {
  console.log(event, "event");
  try {
    const { httpMethod, path, body } = event;
    if (path === "/products") {
      if (httpMethod === "POST") {
        const product = JSON.parse(body);
        const result = await createProduct(product);
        return result;
      } else if (httpMethod === "GET") {
        const result = getProducts();
        return result;
      } else if (httpMethod === "PUT") {
        const { name, description, price, quantity, id } = body;
        const result = updateProduct(id, name, description, price, quantity);
        return result;
      } else if (httpMethod === "DELETE") {
        const { id } = body;
        const result = deleteProduct(id);
        return result;
      } else {
        return {
          statusCode: 500,
          body: "Operation not found",
        };
      }
    }
  } catch (error) {
    return error;
  }
};
