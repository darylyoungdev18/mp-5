// app/url/page.tsx
import { NextRequest } from "next/server";
import getCollection, { COLLECTION_NAME } from "@/db";

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  const { url, alias } = await request.json();

  if (!url || !alias) {
    return new Response(JSON.stringify({ error: "URL and alias are required" }), {
      status: 400,
    });
  }

  if (!isValidUrl(url)) {
    return new Response(JSON.stringify({ error: "Invalid URL format" }), { status: 400 });
  }

  const collection = await getCollection(COLLECTION_NAME);
  const existing = await collection.findOne({ alias });

  if (existing) {
    return new Response(JSON.stringify({ error: "Alias already exists" }), { status: 409 });
  }

  await collection.insertOne({ alias, url });

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
