<script lang="ts">
  import type { Product } from "../../../shared/types/schemas.mts";
  import { addToCart } from "../js/cart.ts";
  import { sendAlert } from "../components/alert/alert.svelte.ts";
  import type { AlertOptions } from "../components/alert";
  import { cartRefresh, selectedColor } from "./cart.svelte.ts";

  type Props = {
    product: Product;
  };
  const { product }: Props = $props();

  function handleAddToCart(event: Event) {
    const target = event.currentTarget as HTMLButtonElement;
    const productString = target.dataset.product;

    if (productString) {
      const productData = JSON.parse(productString);
      if (selectedColor.color) {
        addToCart(productData, selectedColor.color.colorName);

        const alertOptions: AlertOptions = {
          message: `${productData.name} was added to your cart!`,
          type: "success",
          duration: 3000,
        };
        sendAlert(alertOptions);
        cartRefresh.data++;
      } else {
        const alertOptions: AlertOptions = {
          message: `please select a color`,
          type: "warning",
          duration: 1000,
        };
        sendAlert(alertOptions);
      }
    }
  }
</script>

<div class="product-detail__add">
  <button
    onclick={handleAddToCart}
    id="addToCart"
    data-product={JSON.stringify(product)}
  >
    Add to Cart
  </button>
</div>
