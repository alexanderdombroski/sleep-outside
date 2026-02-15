<script lang="ts">
  let {
    label,
    value = $bindable(),
    type = "text"
  } = $props<{
    label: string;
    value: string;
    type?: "text" | "email" | "textarea";
  }>();

  let isEditing = $state(false);
  let originalValue = value;
  let displayEl: HTMLElement | null = $state(null);

  function startEdit() {
    originalValue = value;
    isEditing = true;
  }

  function commitEdit() {
    isEditing = false;
    displayEl?.focus();
  }

  function cancelEdit() {
    value = originalValue;
    isEditing = false;
    displayEl?.focus();
  }

  // if we kept the paragraph approach for display we would have to add this function to make it possible for keyboard users to be able to trigger our edit.
  //   function onDisplayKeydown(e: KeyboardEvent) {
  //     if (e.key === "Enter" || e.key === " ") {
  //       e.preventDefault();
  //       startEdit();
  //     }
  //   }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault();
      commitEdit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  }
</script>

<div class="field">
  <div class="label">{label}</div>
  {#if isEditing}
    {#if type === "textarea"}
      <!-- svelte-ignore a11y_autofocus -->
      <textarea
        bind:value
        aria-label={label}
        autofocus
        onblur={commitEdit}
        onkeydown={handleKeydown}
      ></textarea>
    {:else}
      <!-- svelte-ignore a11y_autofocus -->
      <input
        {type}
        bind:value
        aria-label={label}
        autofocus
        onblur={commitEdit}
        onkeydown={handleKeydown}
      />
    {/if}
  {:else}
    <!-- This is what our paragraph would end up looking like once we added everything we needed for accessibility -->
    <!-- <p
      class="value"
      role="button"
      tabindex="0"
      aria-label={`Edit ${label}`}
      bind:this={displayEl}
      onclick={startEdit}
      onkeydown={onDisplayKeydown}
    >
      {value}
    </p> -->
    <button
      type="button"
      class="value"
      aria-label={`Edit ${label}`}
      bind:this={displayEl}
      onclick={startEdit}
    >
      {value}
    </button>
  {/if}
</div>

<style>
  .field {
    margin-bottom: 1rem;
  }
  .label {
    font-size: 0.75rem;
    color: #666;
  }
  .value {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
  }
  .value:hover {
    background: #f5f5f5;
  }
</style>