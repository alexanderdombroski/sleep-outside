<script>
  import cart from "../assets/hiking-backpack.svg?url";
  import tent from "../../public/images/noun_Tent_2517.svg"
  import UserMenu from "./UserMenu.svelte";
</script>

<header class="divider">
  <div class="logo">
    <a href="/">
      <img src={tent} alt="tent icon" />
      <p>Sleep Outside</p>
    </a>
  </div>
  <nav class="menu-right">
    <div class="user-menu-container">
      <UserMenu />
    </div>
    <div class="cart">
      <a
        href={`/cart`}
        aria-label="Shopping Cart"
        title="Shopping Cart"
      >
        <img src={cart} alt="" role="presentation" />
      </a>
    </div>
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 10px;
  }

  .menu-right {
    /* padding-top: 0.5em; */
    display: flex;
    align-items: center;
  }

  .logo {
    line-height: 60px;
    width: 245px;
    overflow: hidden;
    font-size: 30px;
    text-align: right;
    font-family: var(--font-headline);
  }
  .logo a {
    display: flex;
    flex-direction: row;
    align-content: center;
  }
  .logo img {
    display: block;
    margin-block: auto;
    width: 60px;
    height: 60px;
  }
  .logo p {
    display: inline;
    white-space: nowrap;
    font-size: 1.6rem;
  }
  .logo a, .cart a {
    text-decoration: none;
    color: var(--font-body);
  }
  .cart img {
    width: 30px;
  }
</style>
