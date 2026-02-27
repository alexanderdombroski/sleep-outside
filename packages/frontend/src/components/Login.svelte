<script lang="ts">
  import { login } from "../js/auth.svelte";
  import { getParam } from "../js/utils.mts";
  import { onMount } from 'svelte';

  let email = $state("");
  let password = $state("");

  async function loginHandler(event: SubmitEvent) {
    event.preventDefault();
    console.log(event);
    const data = new FormData(
      event.currentTarget as HTMLFormElement,
      event.submitter,
    );
    await login(data.get("email") as string, data.get("password") as string);
    window.location.href = redirectPath
  }

  let redirectPath = "/";
  onMount(() => {
    // we added the getParam function to utils in Team 5
    const param = getParam("redirect");
    if (param) {
      // if the redirect param exists use that
      redirectPath = param;
    } else if (document.referrer != window.location.href) {
      // otherwise send back to the referring page if set
      redirectPath = document.referrer;
    }
  });
</script>

<h2>Login</h2>
<form onsubmit={loginHandler} class="login-form">
  <label>
    Email:
    <input type="email" bind:value={email} name="email" required />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} name="password" required />
  </label>
  <button type="submit">Login</button>
</form>

<style>
  h2 {
    text-align: center;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 300px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  input {
    margin-top: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  button {
    padding: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>
