import getCollection, { COLLECTION_NAME } from "@/db";

export async function GET(
  request: Request,
  { params }: { params: { alias: string } }
): Promise<Response> {
  const collection = await getCollection(COLLECTION_NAME);
  const record = await collection.findOne({ alias: params.alias }); // Use params.alias directly

  if (!record) {
    return new Response("Alias not found", { status: 404 });
  }

  return Response.redirect(record.url, 302);
}