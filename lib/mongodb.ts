import { MongoClient, type Db } from "mongodb";

/**
 * Cached MongoClient across hot reloads in development and across warm
 * Fluid Compute / serverless invocations in production.
 * @see https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/
 */
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getUri() {
  const uri = process.env.DB_URI;
  if (!uri) {
    throw new Error("Missing DB_URI environment variable.");
  }
  return uri;
}

function getClientPromise() {
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(getUri());
    globalForMongo._mongoClientPromise = client.connect();
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.DB_NAME ?? "anny");
}
