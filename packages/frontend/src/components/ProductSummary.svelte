<script lang="ts">
   import type { Product } from "../../../shared/types/schemas.mjs";
   let { product }: { product: Product } = $props();
</script>

<li class="product-card">
        <a href={`/products/${product._id}/`}>
          <img
            src={product.images.primaryMedium}
            alt={product.name}
          />
          <h3 class="card__brand">{product.brand.name}</h3>
          <h2 class="card__name">{product.name}</h2>
          <p class="product-card__price">${product.listPrice}</p></a
        >
      </li>