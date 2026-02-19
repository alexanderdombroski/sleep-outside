import type { User } from "./schemas.mts";

export type LoginResult = {
  token: string;
  user: Pick<User, "_id" | "email" | "name">;
};
