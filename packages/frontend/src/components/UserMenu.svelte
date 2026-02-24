<script lang="ts">
  import hiker from '../../public/images/noun-hiker.svg?url'
  import { onMount } from "svelte";

  let visible = $state(false);

  function openUserMenu(e: MouseEvent) {
    // Stop the click from reaching the window listener immediately
    e.stopPropagation();
    visible = !visible;
  }

  // Named function required for removal
  function closeMenu() {
    visible = false;
  }

  // Named function required for removal
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      closeMenu();
    }
  }

  onMount(() => {
    // 1. Add Listeners
    // if the user clicks outside the menu, scrolls the page, or hits the `esc` key close the menu.
    window.addEventListener("click", closeMenu);
    window.addEventListener("scroll", closeMenu);
    window.addEventListener("keydown", handleKeydown);

    // 2. Return Cleanup Function
    // Svelte runs this function automatically when the component unmounts
    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("scroll", closeMenu);
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<div class="user">
  <button
    class="user__button"
    aria-label="user management"
    title="User Management"
    onclick={openUserMenu}
  >
    <img src={hiker} alt="user icon" />
  </button>
  
  <nav class="user__menu" class:open={visible}>
    <a href="#">Login</a>
    <a href="#">Profile</a>
    <a href="#">Orders</a>
  </nav>
</div>

<style>
  .user {
    display: flex;
    align-items: flex-end;
  }
  span {
    margin-right: 0.5em;
  }

  .user {
  position: relative;
}

.user a:link,
.user a:visited {
  color: var(--dark-grey);
  text-decoration: none;
}
.user a:hover {
  text-decoration: underline;
}
.user__button {
  background-color: transparent;
  border: 0;
  color: var(--dark-grey);
  width: var(--icon-size);
  height: var(--icon-size);
  overflow: hidden;
  padding: 0;
}
.user__button:hover {
  /* color: var(--light-grey); */
  opacity: 0.7;
}
.user__menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 120%;
  right: 0;
  z-index: 10;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0 1em;
  line-height: 2;

  height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}
.user__menu.open {
  height: auto;
  padding: 1em;
  border: 1px solid var(--primary-color);
}
</style>