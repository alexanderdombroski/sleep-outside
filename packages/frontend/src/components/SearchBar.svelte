<script lang="ts">
  let search = "";

  function searchHandler(event: SubmitEvent) {
    event.preventDefault();
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

<style>
  form {
    display: flex;
    align-items: center;
  }

  input[type="text"] {
    padding: 5px;
    font-size: 1rem;
  }

  button {
    margin: 10px;
    padding: 5px 10px;
    font-size: 1rem;
    cursor: pointer;
  }
</style>