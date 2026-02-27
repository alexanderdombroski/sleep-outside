import type { LoginResult } from "../../../shared/types/apiResults.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mts";

interface UserStore {
  isLoggedIn: boolean;
  user?: {
    name: string;
    email: string;
    _id: string;
  };
  token: string;
}

const BASE_URL = import.meta.env.PUBLIC_SERVER_URL;

export const userStore = $state({
  isLoggedIn: false,
  user: {},
  token: "",
}) as UserStore;

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const data: LoginResult = await res.json();
    userStore.token = data.token;
    userStore.user = data.user;
    userStore.isLoggedIn = true;

    setLocalStorage("userStore", userStore);
  } else {
    const data = await res.json();
    throw new Error(`Issue logging in: ${res.status} ${JSON.stringify(data)}`);
  }
}

export function logout() {
  userStore.user = undefined;
  userStore.token = "";
  userStore.isLoggedIn = false;
  setLocalStorage("userStore", null);
  // we should probably do something if they are on a protected page when they logout...
}

export function checkAuth() {
  // really we are just initilizing our store with data from local storage. We aren't really checking to see if the token is still valid. That will happen the next time we try to use it.
  // if we use it and get an error from the server, we should logout and clear our local storage.
  const userData: UserStore | null = getLocalStorage("userStore");
  if (userData) {
    userStore.token = userData.token;
    userStore.user = userData.user;
    userStore.isLoggedIn = true;
  } else {
    userStore.isLoggedIn = false;
    userStore.user = undefined;
    userStore.token = "";
  }
  return !!userData;
}
