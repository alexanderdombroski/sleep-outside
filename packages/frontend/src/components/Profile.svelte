<script lang="ts">
  import {userStore, logout } from "../js/auth.svelte";
  import { onMount } from "svelte";
  const API_BASE = import.meta.env.PUBLIC_SERVER_URL;
  const BASE_URL = import.meta.env.BASE_URL;
  let profile: { message?: string } = $state({});

  async function getProfile() {
    console.log(userStore.token, 'userStore.token')
    const res = await fetch(`${API_BASE}users/protected`, {
      method: "GET",
      headers: {
        // This is how we pass our token to the server for protected routes.
        Authorization: `Bearer ${userStore.token}`
      }
    });
    if (res.ok) {
      return res.json();
    } else {
      // if we get an error back...it means there is something wrong with our token and we should log the user out.
      logout();
      window.location.href = `${BASE_URL}login/?redirect=${window.location.pathname}`;
    }
  }
  
  async function init() {
    profile = await getProfile();
  }
  onMount(init);
</script>

{#if userStore.isLoggedIn && userStore.token}
  <p>{profile?.message}</p>
{:else}
  <p>You must login to see this page</p>
{/if}