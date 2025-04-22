import getCollection, { COLLECTION_NAME } from "@/db";

export async function POST(request: Request): Promise<Response> {
  const { url, alias } = await request.json();

  try {
    new URL(url);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid URL format" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const collection = await getCollection(COLLECTION_NAME);
  const existing = await collection.findOne({ alias });

  if (existing) {
    return new Response(JSON.stringify({ error: "Alias already exists" }), {
      status: 409,
      headers: { "Content-Type": "application/json" },
    });
  }

  await collection.insertOne({ url, alias });

  return new Response(JSON.stringify({ message: "Short URL created", alias }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
