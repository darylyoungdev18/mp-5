import { NextRequest } from "next/server";
import getCollection, { COLLECTION_NAME } from "@/db";

export async function GET(
    request: NextRequest,
    context: { params: { alias: string } }
  ): Promise<Response> {
    const alias = context.params.alias;
  const collection = await getCollection(COLLECTION_NAME);
  const record = await collection.findOne({ alias: context.params.alias });

  if (!record) {
    return new Response("Alias not found", { status: 404 });
  }

  return Response.redirect(record.url, 302);
}
