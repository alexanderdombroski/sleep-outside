// wrapper for querySelector...returns matching element
export function qs(selector: string, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

/** retrieve data from localstorage */
export function getLocalStorage<T>(key: string): T | null {
  // Check if we are in a browser environment
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data) as T;
      } catch (e) {
        console.error("Error parsing localStorage item:", e);
        return null;
      }
    }
  }
  
  // Return null if on the server or if the key doesn't exist
  return null;
}

/** save data to local storage */
export function setLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
interface ClickHandler {
  (e: Event): void;
}

export function setClick(selector: string, callback: ClickHandler) {
  const element = qs(selector);
  element?.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback(event);
  });
  element?.addEventListener("click", callback);
}

export function openUserMenu(selector: string) {
  setClick(selector, (e: Event) => {
    e.stopPropagation();
    const el = document.querySelector(".user__menu");
    el?.classList.toggle("open");
  });
  setClick("body", () => {
    const openMenus = document.querySelectorAll(".open");
    openMenus.forEach((el) => {
      el?.classList.remove("open");
    });
  });
}

export function getParam(name: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
