import type { Product } from "../../../shared/types/schemas.mjs";

const BASE_URL = import.meta.env.PUBLIC_SERVER_URL;

function convertToJson(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export async function getProducts(category: string) {
  const res = await fetch(`${BASE_URL}products/categories/${category}`);
  return convertToJson(res);
}

export async function findProductById(id: string) {
  // const products = await getData();
  // return products.find((item: Product) => item.id === id);
  const res = await fetch(`${BASE_URL}products/${id}`);
  const data: Product = await res.json();
  return data;
}
