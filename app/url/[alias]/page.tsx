import { redirect } from "next/navigation";
import getPostById from "@/lib/getPostById";

export default async function Page({
  params,
}: {
  params: { alias: string };
}) {
  const post = await getPostById(params.alias);

  if (!post?.url) {
    redirect("/");
  }

  redirect(post.url);
}