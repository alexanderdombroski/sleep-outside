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

export default {
  getAllProducts,
  getProductById,
  getProductsByCategory,
};
