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
    const client = new MongoClient(getUri(), {
      // Fail fast instead of hanging a form submission for the 30s default.
      serverSelectionTimeoutMS: 8000,
      connectTimeoutMS: 8000,
      socketTimeoutMS: 10000,
    });

    globalForMongo._mongoClientPromise = client.connect().catch((error) => {
      // Don't cache a rejected connection; let the next request retry.
      globalForMongo._mongoClientPromise = undefined;
      throw error;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(process.env.DB_NAME ?? "anny");
}
