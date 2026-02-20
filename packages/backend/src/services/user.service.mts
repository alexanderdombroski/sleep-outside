import type { User } from "../../../shared/types/schemas.mts";
import userModel from "../models/users.model.mts";
import * as argon2 from "argon2";
import { generateToken } from "../utils.mts";

export async function login(email: string, password: string) {
  // Check if the user exists in the database. the user will be providing an email as identifier...so we will need a function in the model to retrieve a user by email
  let user: User | null = null;
  let token = null;
  user = await userModel.getUserByEmail(email);
  // check to see if a user was found, ANd that the password provided matches the one returned from the database. Remember that the password in the database is hashed and salted...so we need to use argon2 to verify it "argon2.verify(password, passwordHash)"
  if (user && (await argon2.verify(user.password, password))) {
    // If the user exists and password matches...then generate a token using jsonwebtoken
    token = generateToken(user);
  }
  return { token, user };
}
