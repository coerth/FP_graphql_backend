import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB connection URI
const uri = process.env.MONGODB_URI || '';

// Database and collection names
const dbName = 'mtgdb';
const cardsCollectionName = 'cards';
const decksCollectionName = 'decks';

async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Get the database and collection
        const db = client.db(dbName);
        const cardsCollection = db.collection(cardsCollectionName);
        const decksCollection = db.collection(decksCollectionName);

        // Create an index on the set_id field
        await cardsCollection.createIndex({ set_id: 1 });
        console.log('Index created on set_id field');
        await cardsCollection.createIndex({ name: 1 });
        console.log('Index created on name field');
        await decksCollection.dropIndex('cards.card.id_1');
        console.log('Index dropped on cards.card.id field');
    } catch (error) {
        console.error('Error creating index:', error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);