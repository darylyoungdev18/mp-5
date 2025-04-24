"use server";

import getCollection, { COLLECTION_NAME } from "@/db";


export default async function createNewUrl(
  url: string,
  alias: string,
  shortUrl: string
) {
  const collection = await getCollection(COLLECTION_NAME);

  const existing = await collection.findOne({ alias });
  if (existing) {
    throw new Error("Alias already exists");
  }

  const result = await collection.insertOne({ url, alias, shortUrl });
  return { id: result.insertedId.toHexString(), url, alias, shortUrl };
}
