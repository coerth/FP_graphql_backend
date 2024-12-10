import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import JSONStream from 'JSONStream';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

let MONGODB_URI= "mongodb://user:password@localhost:27017/mtgdb?authSource=admin"

// MongoDB connection URI
const uri = MONGODB_URI;

// Database and collection names
const dbName = 'mtgdb';
const cardsCollectionName = 'cards';

// Path to the JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '.', 'data', 'default-cards.json');

// Function to process each card and insert it into the cards collection
async function processCard(card, cardsCollection) {
    await cardsCollection.insertOne(card);
}

async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Get the database and collection
        const db = client.db(dbName);
        const cardsCollection = db.collection(cardsCollectionName);

        // Create a read stream and JSON parser
        const fileStream = fs.createReadStream(filePath);
        const jsonStream = JSONStream.parse('*');

        fileStream.pipe(jsonStream);

        jsonStream.on('data', async (card) => {
            try {
                await processCard(card, cardsCollection);
            } catch (error) {
                console.error('Error processing card:', error);
            }
        });

        jsonStream.on('end', () => {
            console.log('Data inserted successfully');
            client.close();
        });

        jsonStream.on('error', (error) => {
            console.error('Error reading JSON stream:', error);
            client.close();
        });

    } catch (error) {
        console.error('Error inserting data:', error);
        await client.close();
    } 
}

main().catch(console.error);