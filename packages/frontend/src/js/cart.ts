import { getLocalStorage } from "./utils.mjs";
import type { Product } from "./types.mjs";
import type { Color } from "../../../shared/types/schemas.mts";

export function renderCartContents() {
  const cartItems = getLocalStorage<Product[]>("so-cart") ?? [];
  const uniqueCartItems = Array.from(
    cartItems.map((item) => `${item.id}-${item.colors[0].colorName}`),
  )
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((uniqueKey) => {
      const [id, colorName] = uniqueKey.split("-");
      return cartItems.find(
        (item) => item.id === id && item.colors[0].colorName === colorName,
      ) as Product;
    });
  const htmlItems = uniqueCartItems.map((item) => cartItemTemplate(item));

  const listEl = document.querySelector(".product-list");
  if (listEl) listEl.innerHTML = htmlItems.join("");
  return cartItems;
}

export function getQtys(id: string, colorName: string): number {
  const cartItems = getLocalStorage<Product[]>("so-cart") ?? [];
  const matchingItems = cartItems.filter(
    (item) => item.id === id && item.colors[0].colorName === colorName,
  );
  return matchingItems.length;
}

export function addToCart(product: Product, colorName: string) {
  const cartItems = getLocalStorage<Product[]>("so-cart") ?? [];
  const color = product.colors.find((color) => color.colorName === colorName);
  product = { ...product, colors: [color as Color] };
  cartItems.push(product);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

export function addToCartById(id: string, colorName: string): Product | null {
  const cartItems = getLocalStorage<Product[]>("so-cart") ?? [];
  const product = cartItems.find(
    (item) => item.id === id && item.colors[0].colorName === colorName,
  );
  cartItems.push(product as Product);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  return product || null;
}

export function deleteFromCart(id: string, colorName: string) {
  const cartItems = getLocalStorage<Product[]>("so-cart") ?? [];
  const indexToRemove = cartItems.findIndex(
    (item) => item.id === id && item.colors[0].colorName === colorName,
  );

  if (indexToRemove !== -1) {
    cartItems.splice(indexToRemove, 1);
  }
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

function cartItemTemplate(item: Product) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.images.primaryExtraLarge}"
        alt="${item.name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.name}</h2>
    </a>
    <p class="cart-card__color">${item.colors[0].colorName}</p>

    <div class="qty-container">
      <label for="quantity">Quantity:</label>
      <input type="number" class="quantity-input" data-id="${item.id}" data-color="${item.colors[0].colorName}" name="quantity" value="${getQtys(item.id, item.colors[0].colorName)}" min="1" max="100" step="1" onkeydown="return false" style="
      width: fit-content; 
      cursor: default;
      caret-color: transparent;
      user-select: none;
      outline: none;
      "/>
    </div>
    
    <button 
      class="delete-from-cart" 
      style="grid-column: 3; justify-self: end; background-color: red; color: white;" 
      data-id="${item.id}" 
      data-name="${item.name}"
      data-color="${item.colors[0].colorName}">X</button>

    <p class="cart-card__price">$${item.finalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
