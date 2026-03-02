<script lang="ts">
  import { userStore, logout, changePassword } from "../js/auth.svelte";
  import { onMount } from "svelte";
  import { sendAlert } from "./alert";
  const API_BASE = import.meta.env.PUBLIC_SERVER_URL;
  const BASE_URL = import.meta.env.BASE_URL;
  let profile: { message?: string } = $state({});

  async function getProfile() {
    const res = await fetch(`${API_BASE}users/protected`, {
      method: "GET",
      headers: {
        // This is how we pass our token to the server for protected routes.
        Authorization: `Bearer ${userStore.token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    } else {
      // if we get an error back...it means there is something wrong with our token and we should log the user out.
      logout();
      window.location.href = `${BASE_URL}login/?redirect=${window.location.pathname}`;
    }
  }

  
  let showPasswordForm = $state(false);
  const togglePasswordForm = () => (showPasswordForm = !showPasswordForm);
  let password = $state("");
  let proposedPassword = $state("");

  async function handlePasswordChange() {
    if (proposedPassword) {
      if (proposedPassword === password) {
        await changePassword(password);
        proposedPassword = "";
        password = "";
        return;
      }
      sendAlert({ message: "passwords did not match", type: "warning" });
      proposedPassword = "";
      password = "";
      return;
    }
    proposedPassword = password;
    password = "";
  }
  
  async function init() {
    profile = await getProfile();
  }
  $effect(() => {
    if (userStore.token) {
      init();
    }
  });
</script>

{#if userStore.isLoggedIn && userStore.token}
  <p>{profile?.message}</p>
  <p>
    Hope you enjoy your camping prep! Need to <span
      role="button"
      onclick={togglePasswordForm}
      onkeypress={togglePasswordForm}
      tabindex="0">change your password?</span
    >
  </p>
  {#if showPasswordForm}
    <label for="password">New Password:</label>
    <input type="password" name="password" id="password" bind:value={password} required />
    <button onclick={handlePasswordChange}>{proposedPassword ? "Confirm Password" : "Save"}</button>
  {/if}
{:else}
  <p>You must login to see this page</p>
{/if}

<style>
  p {
    text-align: center;
  }
  span {
    color: var(--primary-color);
    cursor: pointer;
  }
  span:hover {
    text-decoration: underline;
  }
  label {
    font-weight: bold;
  }
  input {
    padding: 0.6rem;
    font-size: 1rem;
    box-sizing: border-box;
  }
  input, label {
    margin-bottom: 0.25rem;
    max-width: 100%;
    width: 15rem;
    display: block;
    margin-inline: auto;
  }
</style>
