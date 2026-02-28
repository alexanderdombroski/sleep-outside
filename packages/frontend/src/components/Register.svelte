<script lang="ts">
</script>

<form>
  <label for="name">Fullname:</label>
  <input type="text" name="name" id="name" required />
  <label for="email">Email:</label>
  <input type="email" name="email" id="email" required />
  <label for="passord">Passord:</label>
  <input type="password" name="passord" id="passord" required />
  <label for="password2">Confirm Password:</label>
  <input type="password" name="password2" id="password2" required />
  <button type="submit">Submit</button>
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
</style>
