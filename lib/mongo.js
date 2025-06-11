// /lib/mongo.js
import { MongoClient } from 'mongodb';



// let cachedDb = null;

// Function to connect to the database
export async function connectToDatabase() {

  const client = new MongoClient('mongodb://127.0.0.1:27017');

  // if (cachedDb) {
  //   return cachedDb;
  // }

  await client.connect();
  const db = client.db('nextjs-ecs-demo1');  // Use the default database (can also be specified as `client.db('blog-demo')`)
  // cachedDb = db;

  return db;
}

