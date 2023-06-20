import { dbConnection } from "../db/dbConnection.js";

const connection = await dbConnection();

function successResponse(statusCode, data) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(data),
  };
}

function errorResponse(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({ message }),
  };
}

export const createProductService = async (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      await connection.query("INSERT INTO products SET ?", product);
      const response = successResponse(201, "success");
      resolve(response);
    } catch (err) {
      console.log("[createProductService]: Error inserting values", err);
      const response = errorResponse(500, "Error inserting values");
      reject(response);
    }
  });
};

export const getProductsService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows] = await connection.query("SELECT * FROM products");
      console.log("Retrieved values:", rows);
      const response = successResponse(200, rows);
      resolve(response);
    } catch (err) {
      console.log("[getProductsService]: Error retrieving values", err);
      const response = errorResponse(500, "Error retrieving values");
      reject(response);
    }
  });
};

export const updateProductService = async (id, name, description, price, quantity) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id, name, description, price, quantity);
      const query = `UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?`;
      const [result] = await connection.query(query, [name, description, price, quantity, id]);
      console.log(result);
      if (result.affectedRows > 0) {
        const response = successResponse(200, "success");
        resolve(response);
      } else {
        const response = errorResponse(404, "Product not found");
        reject(response);
      }
    } catch (error) {
      console.error("[updateProductService]: Update failed", error);
      const response = errorResponse(500, "Update failed");
      reject(response);
    }
  });
};

export const deleteProductService = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM products WHERE id = ?`;
      const [result] = await connection.query(query, [id]);
      if (result.affectedRows > 0) {
        const response = successResponse(200, "Deleted a product successfully");
        resolve(response);
      } else {
        const response = errorResponse(404, "Product not found");
        reject(response);
      }
    } catch (error) {
      console.log("[deleteProductService]: Deleted a product failed:", error);
      const response = errorResponse(500, "Deleted a product failed");
      reject(response);
    }
  });
};
