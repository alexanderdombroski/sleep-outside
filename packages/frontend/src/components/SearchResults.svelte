<script lang="ts" context="module">
    import ProductSummary from "./ProductSummary.svelte";
  // ← This is the magic that fixes the TypeScript error in Astro
  export interface Props {
    q: string | null;
    error: string | null;
    products: any[];        // you can make this stricter later if you want
  }
</script>

<script lang="ts">
  export let q: Props['q'] = null;
  export let error: Props['error'] = null;
  export let products: Props['products'] = [];
</script>

{#if q}
  {#if error}
    <p>Error: {error}</p>
  {:else if products.length > 0}
    <div>
      {#each products as product (product.id)}
        <div>
          <ProductSummary product={product} />
        </div>
      {/each}
    </div>
  {:else}
    <p>No products found for "{q}"</p>
  {/if}
{:else}
  <p>Enter a search term</p>
{/if}

<p>test</p>