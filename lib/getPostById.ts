import getCollection, { COLLECTION_NAME } from "@/db";

export default async function getPostById(alias: string) {
  const collection = await getCollection(COLLECTION_NAME);
  return collection.findOne({ alias });
}