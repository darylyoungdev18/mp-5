import { NextRequest } from "next/server";
import getCollection, { COLLECTION_NAME } from "@/db";

type Params = {
  params: {
    alias: string;
  };
};

export async function GET(
  request: NextRequest,
  params: Params
): Promise<Response> {
  const alias = params.params.alias;
  const collection = await getCollection(COLLECTION_NAME);
  const record = await collection.findOne({ alias });

  if (!record) {
    return new Response("Alias not found", { status: 404 });
  }

  return Response.redirect(record.url, 302);
}
