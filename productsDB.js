import { dbConnection } from "./dbConnection.js";

const connection = await dbConnection();
export const createProduct = async (product) => {
  try {
    await connection.query("INSERT INTO products SET ?", product);
    return { statusCode: 201, body: "Values inserted successfully " };
  } catch (err) {
    console.log("Error inserting values:", err);
    return {
      statusCode: 500,
      body: "Error inserting values",
      error: err,
    };
  }
};

export const getProducts = async () => {
  try {
    const [rows] = await connection.query("SELECT * FROM products");
    console.log("Retrieved values:", rows);
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (err) {
    console.log("Error retrieving values:", err);
    return {
      statusCode: 500,
      body: "Error retrieving values",
      error: err,
    };
  }
};

export const updateProduct = async (id, name, description, price, quantity) => {
  try {
    const query = `UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?`;
    await connection.query(query, [name, description, price, quantity, id]);
    return {
      statusCode: 200,
      body: "Updated successfully",
    };
  } catch (error) {
    console.log("Updated failed:", error);
    return {
      statusCode: 500,
      body: "Updated failed",
      error: error,
    };
  }
};

export const deleteProduct = async (id) => {
  try {
    const query = `DELETE FROM products WHERE id = ?`;
    await connection.query(query, [id]);
    return {
      statusCode: 200,
      body: "Deleted a product successfully",
    };
  } catch (error) {
    console.log("Deleted a product failed:", error);
    return {
      statusCode: 500,
      body: "Deleted a product failed",
      error: error,
    };
  }
};
