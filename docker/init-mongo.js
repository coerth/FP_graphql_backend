const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const JSONStream = require('jsonstream');

// MongoDB connection URI
const uri = 'mongodb://user:password@localhost:27017';

// Database and collection names
const dbName = 'mtgdb';
const cardsCollectionName = 'cards';
const setsCollectionName = 'sets';

// Path to the JSON file
const filePath = path.join(__dirname, '..', 'data', 'all-cards-20240902092058.json');

// Function to process each card and extract sets
async function processCard(card, cardsCollection, setsCollection, sets) {
    // Insert the card into the cards collection
    await cardsCollection.insertOne(card);

    // Extract the set information
    const set = {
        set_id: card.set_id,
        set: card.set,
        set_name: card.set_name,
        set_type: card.set_type,
        set_uri: card.set_uri,
        set_search_uri: card.set_search_uri,
        scryfall_set_uri: card.scryfall_set_uri
    };

    // Add the set to the sets collection if it doesn't already exist
    if (!sets.has(set.set_id)) {
        console.log(`Inserting set: ${set.set_name}`);
        await setsCollection.insertOne(set);
        sets.add(set.set_id);
    }
}

async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Get the database and collections
        const db = client.db(dbName);
        const cardsCollection = db.collection(cardsCollectionName);
        const setsCollection = db.collection(setsCollectionName);

        await db.createCollection(cardsCollectionName).catch(() => {});
        await db.createCollection(setsCollectionName).catch(() => {});

        // Create a set to keep track of inserted sets
        const sets = new Set();

        // Create a read stream and JSON parser
        const fileStream = fs.createReadStream(filePath);
        const jsonStream = JSONStream.parse('*');

        fileStream.pipe(jsonStream);

        jsonStream.on('data', async (card) => {
            try {
                await processCard(card, cardsCollection, setsCollection, sets);
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