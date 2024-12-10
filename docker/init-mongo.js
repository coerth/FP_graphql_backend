import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

// MongoDB connection URI
const uri = process.env.MONGODB_URI || '';
const dbName = 'mtgdb';
const cardsCollectionName = 'cards';

// Path to the JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '.', 'data', 'default-cards.json');

async function processCard(card, cardsCollection) {
    try {
        if (card.id) {
            await cardsCollection.updateOne(
                { id: card.id }, 
                { $set: card },
                { upsert: true }
            );
        } else {
            console.warn('Card skipped due to missing card_id:', card);
        }
    } catch (error) {
        console.error('Error processing card:', error);
    }
}

async function main() {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 9999999, // Optional: increases socket timeout
        connectTimeoutMS: 9999999, // Optional: increases connection timeout
    });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Get the database and collection
        const db = client.db(dbName);
        const cardsCollection = db.collection(cardsCollectionName);

        // Read and parse the entire JSON file
        const fileData = fs.readFileSync(filePath, 'utf8');
        const cards = JSON.parse(fileData); // Parse the entire JSON content

        // Process each card
        for (const card of cards) {
            await processCard(card, cardsCollection);
        }

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await client.close(); // Ensure client is closed at the end
    }
}

main().catch(console.error);
