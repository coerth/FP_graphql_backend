import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection URI
const uri = process.env.MONGODB_URI || 'mongodb://user:password@localhost:27017';

// Database and collection names
const dbName = 'mtgdb';
const cardsCollectionName = 'cards';

async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Get the database and collection
        const db = client.db(dbName);
        const cardsCollection = db.collection(cardsCollectionName);

        // Create an index on the set_id field
        await cardsCollection.createIndex({ set_id: 1 });
        console.log('Index created on set_id field');
    } catch (error) {
        console.error('Error creating index:', error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);