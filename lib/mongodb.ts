import { MongoClient, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI?.trim();
if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (!/^mongodb(?:\+srv)?:\/\//.test(uri)) {
  throw new Error('Invalid environment variable: "MONGODB_URI" must be a MongoDB connection string');
}

const dbName = process.env.MONGODB_DB?.trim();
if (!dbName) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DB"');
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 2,
  maxConnecting: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  waitQueueTimeoutMS: 5000,
  retryReads: true,
  retryWrites: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
