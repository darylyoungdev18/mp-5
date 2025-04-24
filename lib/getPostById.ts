import getCollection, { COLLECTION_NAME } from "@/db";
import { ObjectId } from "mongodb";
import { UrlProps } from "@/types";

export default async function getURLById(id: string): Promise<UrlProps | null> {
  const urlId = new ObjectId(id);
  const collection = await getCollection(COLLECTION_NAME);
  const data = await collection.findOne({ _id: urlId });

  if (!data) return null;

  return {
    id,
    url: data.url,
    alias: data.alias,
    shortUrl: data.shortUrl,
  };
}
