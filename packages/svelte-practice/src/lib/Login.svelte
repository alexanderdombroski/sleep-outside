<script lang="ts">
  let { isLoggedIn = $bindable<boolean>() } = $props();
  async function loginHandler(e: SubmitEvent) {
    e.preventDefault();
    // console.error("Failed to log in. There is no database");
    isLoggedIn = true;
  }
</script>

<form onsubmit={loginHandler}>
  <label for="email">Email:</label>
  <input type="email" name="email" id="email" required />
  <label for="password">Password:</label>
  <input type="password" name="password" id="password" minlength="6" required />

  <button type="submit">Log In</button>
</form>

<style>
  label,
  input,
  button {
    display: block;
    margin: 0.25rem;
  }
</style>
