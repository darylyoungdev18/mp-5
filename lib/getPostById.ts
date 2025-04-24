import getCollection, { COLLECTION_NAME } from "@/db";
import { ObjectId } from "mongodb";

export default async function getPostById(id: string) {
  const collection = await getCollection(COLLECTION_NAME);
  const objectId = new ObjectId(id);
  const data = await collection.findOne({ _id: objectId });

  if (!data) return null;
  return {
    id,
    url: data.url,
    alias: data.alias,
    shortUrl: data.shortUrl,
  };
}
