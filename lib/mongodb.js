import { MongoClient } from "mongodb";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

let clientPromise;

function getClientPromise() {
  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI, clientOptions);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export default getClientPromise;
