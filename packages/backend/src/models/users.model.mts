import { type User, UserSchema } from "../../../shared/types/schemas.mts";
import mongodb from "../database/index.mts";
import * as argon2 from "argon2";

async function getAllusers(): Promise<User[] | null> {
  const data = await mongodb
    .getDb()
    .collection<User>("users")
    .find({})
    .toArray();
  console.info(data);
  return data;
}

async function getUserById(id: string): Promise<User | null> {
  const data = await mongodb.getDb().collection<User>("users").findOne({ id });
  console.info(data);
  return data;
}

async function getUserByEmail(email: string): Promise<User | null> {
  const data = await mongodb
    .getDb()
    .collection<User>("users")
    .findOne({ email });
  console.info(data);
  return data;
}

async function addUser({
  name,
  email,
  password,
}: Pick<User, "name" | "email" | "password">): Promise<void> {
  let newUser: Omit<User, "_id"> = {
    name,
    email,
    password: await argon2.hash(password),
    joinDate: new Date(),
    addressIds: [],
    role: "user",
  };

  UserSchema.parse({ _id: "To Be Created", ...newUser });

  let { insertedId } = await mongodb
    .getDb()
    .collection<User>("users")
    .insertOne(newUser as User);

  console.info(`User with id ${insertedId} added to the database.`);
}

async function updateUser(user: User): Promise<void> {
  user.password = await argon2.hash(user.password);
  await mongodb
    .getDb()
    .collection<User>("users")
    .replaceOne({ _id: user._id }, user);
  console.info(`User with id ${user.name} updated in the database.`);
}

async function dropUser(): Promise<void> {
  await mongodb.getDb().collection<User>("users").drop();
  console.info(`Users collection dropped.`);
}

export default {
  getAllusers,
  addUser,
  getUserByEmail,
  dropUser,
  getUserById,
  updateUser,
};
