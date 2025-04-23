import { NextRequest } from "next/server";
import getCollection, { COLLECTION_NAME } from "@/db";
import type { RouteParams } from "next/dist/server/future/route-matches/route-match";

export async function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
): Promise<Response> {
  const alias = params.alias as string;
  const collection = await getCollection(COLLECTION_NAME);
  const record = await collection.findOne({ alias });

  if (!record) {
    return new Response("Alias not found", { status: 404 });
  }

  return Response.redirect(record.url, 302);
}