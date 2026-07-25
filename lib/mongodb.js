import {MongoClient} from "mongodb";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const clientPromise = new MongoClient(process.env.MONGODB_URI, clientOptions).connect();
export default clientPromise;
