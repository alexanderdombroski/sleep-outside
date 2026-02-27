import { get } from "node:http";
import productModel from "../models/product.model.mts";

const getProductById = async (id: string) => {
  return await productModel.getProductById(id);
};

const getAllProducts = async () => {
  return await productModel.getAllProducts();
};
const getProductsByCategory = async (category: string) => {
  return await productModel.getProductsByCategory(category);
};
const getProductsByQuery = async (query: string) => {
  return await productModel.getProductsByQuery(query);
};

export default {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByQuery,
};
