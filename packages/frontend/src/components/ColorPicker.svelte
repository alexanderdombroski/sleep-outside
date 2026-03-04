<script lang="ts">
  import type { Color } from "../../../shared/types/schemas.mts";

  type Props = {
    colors: Color[];
    selected?: Color;
    onChange?: (color?: Color) => void;
  };

  let { colors, selected, onChange }: Props = $props();

  function selectColor(color?: Color) {
    selected = color;
    onChange?.(color);
  }
</script>

<div class="color-picker">
  {#each colors as color}
    <button
      class:selected={selected === color}
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
