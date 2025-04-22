import {MongoClient, Db, Collection } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI as string;
if(!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is undefined or not set up');
}

const DB_NAME = "cs-701-mp-5-database";
export const COLLECTION_NAME = "urls-collection";

let client : MongoClient | null = null;
let db : Db | null = null;

async function connect() : Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
    }

export default async function getCollection(
    collectionName : string, ) : Promise<Collection> {
    if (!db){
        db = await connect();
    }
    return db.collection(collectionName);
}
    