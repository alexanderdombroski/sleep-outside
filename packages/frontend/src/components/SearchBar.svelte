<script lang="ts">
  let search = "";

  function searchHandler(event: SubmitEvent) {
    console.info("testing");           // ← you’ll see this now
    event.preventDefault();            // ← prevents page reload
    console.info("Search value:", search);

    // Your redirect (or do a fetch, navigate, etc.)
    window.location.href = `/product-list/search?q=${encodeURIComponent(search)}`;
  }
</script>

<form on:submit={searchHandler}>
  <label>
    <input type="text" bind:value={search} name="search" required />
  </label>
  <button type="submit">Search</button>
</form>