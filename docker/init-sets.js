import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// MongoDB connection URI
const uri = 'mongodb://user:password@localhost:27017';

// Database and collection names
const dbName = 'mtgdb';
const setsCollectionName = 'sets';

// Path to the JSON file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '..', 'data', 'sets.json');


async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Get the database and collection
        const db = client.db(dbName);
        const setsCollection = db.collection(setsCollectionName);

        // Read the JSON file
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Insert the sets into the collection
        const sets = data.data;
        for (const set of sets) {
            await setsCollection.updateOne(
                { set_id: set.set_id },
                { $set: set },
                { upsert: true }
            );
            console.log(`Inserted/Updated set: ${set.name}`);
        }

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await client.close();
    }
}

main().catch(console.error);