import type { LoginResult } from "../../../shared/types/apiResults.mjs";
import { setLocalStorage } from "./utils.mts";

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
    body: JSON.stringify({ email, password }),
  });

  if (res.ok) {
    const data: LoginResult = await res.json();
    userStore.isLoggedIn = true;
    userStore.token = data.token;
    userStore.user = data.user;

    setLocalStorage("userStore", userStore);
  } else {
    throw new Error(`Issue loggin in: ${res.status} ${res.statusText}`);
  }
}

export async function logout() {}

export async function checkAuth() {}
