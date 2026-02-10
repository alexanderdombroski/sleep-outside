import { type Db, MongoClient, ServerApiVersion } from "mongodb";
import { createProducts } from "./data/products.ts";
import { createUsers } from "./data/users.ts";
import type { Product, User, Alert } from "../../../shared/types/schemas.mts";
import { alerts } from "./data/alerts.ts";

// node --env-file=packages/backend/.env packages/backend/src/database/init-db.ts

const URI = process.env.MONGO_URI;

if (!URI) {
  throw new Error("No Uri found in environment");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/** connect to our database and create fresh collections */
const init = async () => {
  try {
    await client.connect();
    console.info(`Connecting to MongoDB`);

    await client.db("admin").command({ ping: 1 });
    console.info(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    // get a reference to the actual database we will be using with .db(<database name>)
    const db = client.db("sleepoutside");

    // initialize the mock collections
    await insertMockData(db);
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    await client.close();
  }
};

const insertMockData = async (db: Db) => {
  try {
    // drop and recreate collections to clear out the old records
    for (const collection of ["products", "alerts", "users", "reviews"]) {
      await db.dropCollection(collection);
      await db.createCollection(collection);
      console.info(
        `Collection ${collection} dropped and recreated successfully`,
      );
    }

    // create indexes for the users collection
    await db.collection("users").createIndex({ name: 1 });
    await db.collection("users").createIndex({ email: 1 });

    // create indexes for the products collection
    await db.collection("products").createIndex({ name: 1 });
    await db.collection("products").createIndex({ description: 1 });
    await db.collection("products").createIndex({ category: 1 });
    await db.collection("products").createIndex({ id: 1 });

    // insert all mock data
    const results = await Promise.all([
      db.collection<Product>("products").insertMany(createProducts()),
      db.collection<User>("users").insertMany(await createUsers()),
      db.collection<Alert>("alerts").insertMany(alerts),
    ]);

    const totalInsertCount = results.reduce(
      (acc, { insertedCount }) => acc + insertedCount,
      0,
    );

    console.info(`${totalInsertCount} new listing(s) created`);
  } catch (error) {
    console.error((error as Error).message);
  }
};

init();
