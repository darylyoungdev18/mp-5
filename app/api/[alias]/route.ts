import { NextRequest } from "next/server";
import getCollection, { COLLECTION_NAME } from "@/db";

type Props = {
  params: {
    alias: string;
  };
};

export async function GET(
  request: NextRequest,
  props: Props
): Promise<Response> {
  const { alias } = props.params;
  const collection = await getCollection(COLLECTION_NAME);
  const record = await collection.findOne({ alias });

  if (!record) {
    return new Response("Alias not found", { status: 404 });
  }

  return Response.redirect(record.url, 302);
}