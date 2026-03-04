<script lang="ts">
  import { onMount } from "svelte";
  import { getProducts } from "../js/productData.mjs";
  import type { Product } from "../../../shared/types/schemas.mjs";
  import { getParam } from "../js/utils.mjs";
  import ProductSummary from "./ProductSummary.svelte";
    import SearchBar from "./SearchBar.svelte";

// declare these out here as state so we can us it in our template below
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('q');
  let category = $state(""); 
  let products:Product[] = $state([]);
    
    async function init() {
        console.log("init called");
        category = getParam("category") || ""
        if (myParam) {
            console.log("Search query:", myParam);
            const resp = await fetch(
              `${import.meta.env.PUBLIC_SERVER_URL}products/search/${encodeURIComponent(myParam)}`
            );

            if (!resp.ok) throw new Error("Failed to fetch products");
            const searchResults = await resp.json();
            console.log("Search results:", searchResults);
            products = searchResults;
        }
        else { 
          const data = await getProducts(category);
          products = data;
        }
       
  }

  onMount(init);
</script>

<h2>Top Products: {category}</h2>

<ul class="product-list">
{#each products as product}
<ProductSummary product={product} />
{/each}
</ul>  