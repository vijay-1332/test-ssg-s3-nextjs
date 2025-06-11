// /lib/mongo.js
import { MongoClient } from 'mongodb';



// let cachedDb = null;

// Function to connect to the database
export async function connectToDatabase() {

  const client = new MongoClient(process.env.MONGODB_URI);

  // if (cachedDb) {
  //   return cachedDb;
  // }

  await client.connect();
  const db = client.db('nextjs-ecs-demo1');  // Use the default database (can also be specified as `client.db('blog-demo')`)
  // cachedDb = db;

  return db;
}

