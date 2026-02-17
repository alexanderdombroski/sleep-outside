import { defineCollection } from "astro:content";

const products = defineCollection({
  loader: async () => {
    const response = await fetch(
      import.meta.env.PUBLIC_SERVER_URL + "products?limit=200",
    );
    const data = await response.json();
    // Must return an array of entries with an id property, or an object with IDs as keys and entries as values
    return data.map(({ _id, ...rest }) => ({ id: _id, ...rest }));
  },
});

export const collections = { products };
