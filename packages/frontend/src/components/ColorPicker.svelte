<script lang="ts">
  import type { Color } from "../../../shared/types/schemas.mts";
  import { selectColor, selectedColor } from "./cart.svelte";

  type Props = {
    colors: Color[];
  };

  let { colors }: Props = $props();
</script>

<div class="color-picker">
  {#each colors as color}
    <button
      class:selected={selectedColor.color === color}
      style={`background: url(${color.colorChipImageSrc})`}
      onclick={() => selectColor(color)}
      aria-label={color.colorName}
    ></button>
  {/each}
</div>

<style>
  .color-picker {
    display: flex;
    gap: 0.5rem;
  }

  button {
    width: 40px;
    height: 40px;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    cursor: pointer;
    transition:
      transform 0.1s ease,
      border 0.2s ease;
  }

  button:hover {
    transform: scale(1.1);
  }

  button.selected {
    border: 2px solid red;
  }
</style>
