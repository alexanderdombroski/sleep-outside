<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { getAlert } from "./alert.svelte.ts";

  let alertState = getAlert();
</script>

{#if alertState.current}
  <div
    class={`alert ${alertState.current.type ?? "info"}`}
    in:fly={{ y: -20, duration: 200 }}
    out:fade
    style:--alert-bg={alertState.current.styles?.background}
    style:--alert-color={alertState.current.styles?.color}
    style:--alert-border={alertState.current.styles?.border}
  >
    {alertState.current.message}
  </div>
{/if}

<style>
  .alert {
    position: fixed;
    top: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    z-index: 9999;

    background: var(--alert-bg, #333);
    color: var(--alert-color, white);
    border: 1px solid var(--alert-border, transparent);
  }

  .success {
    --alert-bg: #16a34a;
  }
  .error {
    --alert-bg: #dc2626;
  }
  .warning {
    --alert-bg: #f59e0b;
  }
  .info {
    --alert-bg: #2563eb;
  }
</style>
