import type { LoginResult } from "../../../shared/types/apiResults.mjs";
import type { User } from "../../../shared/types/schemas.mts";
import { sendAlert } from "../components/alert";
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

const API_ROOT = import.meta.env.PUBLIC_SERVER_URL;
const BASE_URL = import.meta.env.BASE_URL;

export const userStore = $state({
  isLoggedIn: false,
  user: {},
  token: "",
}) as UserStore;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_ROOT}users/login`, {
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
  setLocalStorage("userStore", null);
  userStore.user = undefined;
  userStore.token = "";
  userStore.isLoggedIn = false;
  window.location.href = BASE_URL;
}

export function checkAuth() {
  // really we are just initilizing our store with data from local storage. We aren't really checking to see if the token is still valid. That will happen the next time we try to use it.
  // if we use it and get an error from the server, we should logout and clear our local storage.
  const userData: UserStore | null = getLocalStorage("userStore");
  if (userData) {
    userStore.token = userData.token;
    userStore.user = userData.user;
    userStore.isLoggedIn = true;
  }
  return !!userData;
}

export type RegistrationInfo = Pick<User, "email" | "name" | "password">;

export async function register(newUserData: RegistrationInfo) {
  const res = await fetch(`${API_ROOT}users`, {
    body: JSON.stringify(newUserData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { message } = await res.json();
    sendAlert({ message, type: "error" });
    return;
  }

  await login(newUserData.email, newUserData.password);
  sendAlert({ message: `Welcome, ${newUserData.name}`, type: "success" });
  window.location.href = `${BASE_URL}`;
}

export async function changePassword(password: string) {
  const email = userStore.user!.email;
  const res = await fetch(`${API_ROOT}users/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userStore.token}`,
    },
    body: JSON.stringify({ email, password }),
  });

  const { message } = await res.json();
  if (res.ok) {
    sendAlert({ type: "success", message });
    login(email, password);
  } else {
    sendAlert({ type: "error", message });
  }
}
