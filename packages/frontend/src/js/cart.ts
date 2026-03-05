import { getLocalStorage } from "./utils.mjs";
import type { Product } from "./types.mjs";
import type { Color } from "../../../shared/types/schemas.mts";

export function renderCartContents() {
  const cartItems = getLocalStorage<Product[]>("so-cart") ?? [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const listEl = document.querySelector(".product-list");
  if (listEl) listEl.innerHTML = htmlItems.join("");
  return cartItems;
}

export function addToCart(product: Product, colorName: string) {
  const cartItems = getLocalStorage<Product[]>("so-cart") ?? [];
  const color = product.colors.find((color) => color.colorName === colorName);
  product = { ...product, colors: [color as Color] };
  cartItems.push(product);
  localStorage.setItem("so-cart", JSON.stringify(cartItems));
  renderCartContents();
}

export function deleteFromCart(id: string) {
  const cartItems = getLocalStorage<Product[]>("so-cart") ?? [];
  const updatedCartItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("so-cart", JSON.stringify(updatedCartItems));
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
    
    <button 
      class="delete-from-cart" 
      style="grid-column: 3; justify-self: end; background-color: red; color: white;" 
      data-id="${item.id}" 
      data-name="${item.name}">X</button>

    <p class="cart-card__quantity">qty: 1</p>
    
    <p class="cart-card__price">$${item.finalPrice}</p>
  </li>`;

  return newItem;
}

renderCartContents();
