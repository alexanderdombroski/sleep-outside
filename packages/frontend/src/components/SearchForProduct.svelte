<script  context="module">
import { findProductById } from "../js/productData.mts";   // ← adjust path if needed

export const load = async ({ url }) => {
    const q = url.searchParams.get("q");

    let products = [];
    let enrichedProducts = [];
    let error = null;

    if (q) {
        try {
            const resp = await fetch(
                `${import.meta.env.PUBLIC_SERVER_URL}products/search/${encodeURIComponent(q)}`
            );

            if (!resp.ok) throw new Error("Failed to fetch products");
            products = await resp.json();

            // Enrich with full data on the server (exactly like before)
            if (products.length > 0) {
                enrichedProducts = await Promise.all(
                    products.map((p) => findProductById(p.id))
                );
            }
        } catch (err) {
            error = err.message;
        }
    }

    return {
        q,
        error,
        products: enrichedProducts   // this is what SearchResults expects
    };
};
</script>