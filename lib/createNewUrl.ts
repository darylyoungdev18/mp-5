"use server";

import getCollection, { COLLECTION_NAME } from "@/db";
import { UrlProps } from "../types";

export default async function createNewUrl(
  url: string,
  alias: string,
  shortUrl: string
): Promise<UrlProps> {
  const p = { url, alias, shortUrl };

  const collection = await getCollection(COLLECTION_NAME);
  const existing = await collection.findOne({ alias });

  if (existing) {
    throw new Error("Alias already taken");
  }

  const res = await collection.insertOne(p);

  if (!res.acknowledged) {
    throw new Error("DB insert failed");
  }

  return { ...p, id: res.insertedId.toHexString() };
}
