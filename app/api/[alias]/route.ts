import { NextRequest } from "next/server";
import getCollection, { COLLECTION_NAME } from "@/db";


export function GET(
  request: NextRequest,
  context: any
) {
  
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const alias = pathParts[pathParts.length - 1];
  
  return handleRedirect(alias);
}

async function handleRedirect(alias: string): Promise<Response> {
  const collection = await getCollection(COLLECTION_NAME);
  const record = await collection.findOne({ alias });

  if (!record) {
    return new Response("Alias not found", { status: 404 });
  }

  return Response.redirect(record.url, 302);
}