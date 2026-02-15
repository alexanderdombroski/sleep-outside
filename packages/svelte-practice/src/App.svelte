<script lang="ts">
  import Login from "./lib/Login.svelte";
  import UserProfile from "./components/UserProfile.svelte";
  let isLoggedIn: boolean = $state(false);
</script>

<main>
  {#if isLoggedIn}
    <UserProfile />
  {:else}
    <Login bind:isLoggedIn />
  {/if}
</main>

<style>
  main {
    margin: auto;
  }
</style>
