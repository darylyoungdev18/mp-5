// app/url/[alias]/page.tsx
import getPostById from "@/lib/getPostById";
import { redirect } from "next/navigation";

export default async function RedirectAlias({
  params,
}: {
  params: { alias: string };
}) {
  const post = await getPostById(params.alias);

  if (!post?.url) {
    return redirect("/");
  }

  return redirect(post.url);
}
