import * as argon2 from "argon2";
import { UserSchema, type User } from "../../../../shared/types/schemas.mts";

// Create users
export async function createUsers(): Promise<User[]> {
  // TODO - before the app "goes" into production, remove these users and/or change passwords!
  const adminPasswordHash = await argon2.hash("admin123");
  const userPasswordHash = await argon2.hash("user123");

  const users: User[] = [
    {
      _id: "1",
      name: "Admin",
      email: "admin@example.com",
      password: adminPasswordHash,
      addressIds: [],
      joinDate: new Date(),
      role: "admin",
    },
    {
      _id: "2",
      name: "User",
      email: "user@example.com",
      password: userPasswordHash,
      addressIds: [],
      joinDate: new Date(),
      role: "user",
    },
  ];

  // Optional: validate with Zod
  users.forEach((user) => UserSchema.parse(user));

  return users;
}
