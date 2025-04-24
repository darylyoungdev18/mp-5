import { NextRequest } from "next/server";
import getCollection, { COLLECTION_NAME } from "@/db";

export async function POST(request: NextRequest): Promise<Response> {
  const { url, alias } = await request.json();

  if (!url || !alias) {
    return new Response(JSON.stringify({ error: "URL and alias required" }), { status: 400 });
  }

  try {
    const collection = await getCollection(COLLECTION_NAME);

    const existing = await collection.findOne({ alias });
    if (existing) {
      return new Response(JSON.stringify({ error: "Alias already exists" }), { status: 409 });
    }

    const shortUrl = `${request.nextUrl.origin}/url/placeholder`;
    const result = await collection.insertOne({ url, alias, shortUrl });

    const id = result.insertedId.toHexString();
    return new Response(JSON.stringify({ id }), { status: 201 });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
