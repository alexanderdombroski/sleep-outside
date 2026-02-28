<script lang="ts">
  import {
    register,
    userStore,
    type RegistrationInfo,
  } from "../js/auth.svelte";

  let ps1 = $state("");
  let ps2 = $state("");
  let isMatch = $derived(ps1 === ps2);

  async function submitHandler(event: SubmitEvent) {
    event.preventDefault();
    if (!isMatch) return;
    const data = new FormData(
      event.currentTarget as HTMLFormElement,
      event.submitter,
    );
    await register({
      email: data.get("email")?.toString()?.trim() as string,
      password: data.get("password")?.toString()?.trim() as string,
      name: data.get("name")?.toString()?.trim() as string,
    });
  }
</script>

<form onsubmit={submitHandler}>
  <label for="name">Full Name:</label>
  <input type="text" name="name" id="name" required />
  <label for="email">Email:</label>
  <input type="email" name="email" id="email" required />
  <label for="password">Password:</label>
  <input
    type="password"
    name="password"
    id="password"
    bind:value={ps1}
    required
  />
  <label for="password2">Confirm Password:</label>
  <input
    type="password"
    name="password2"
    id="password2"
    bind:value={ps2}
    required
  />
  {#if !isMatch && ps1 && ps2}
    <span class="error">*Passwords much match</span>
  {/if}
  <button type="submit" disabled={!isMatch}>Submit</button>
</form>

<style>
  /* Form container */
  form {
    width: 100%;
    max-width: 420px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-inline: auto;
    border: solid black 1px;
    border-radius: 1rem;
  }

  /* Label + input grouping */
  form label {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  form input {
    padding: 0.6rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  /* Add spacing between groups */
  form label:not(:first-of-type) {
    margin-top: 0.75rem;
  }

  /* Submit button spacing */
  form button[type="submit"] {
    margin-top: 1.5rem;
    cursor: pointer;
  }

  .error {
    color: red;
  }
</style>
