import { NextRequest } from "next/server";
import getCollection, { COLLECTION_NAME } from "@/db";

export const dynamic = 'force-dynamic';

interface Context {
  params: {
    alias: string;
  };
}

export async function GET(
  request: NextRequest,
  context: Context
): Promise<Response> {
  const alias = context.params.alias;
  const collection = await getCollection(COLLECTION_NAME);
  const record = await collection.findOne({ alias });

  if (!record) {
    return new Response("Alias not found", { status: 404 });
  }

  return Response.redirect(record.url, 302);
}