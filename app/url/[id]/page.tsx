import getURLById from "@/lib/getPostById";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getURLById(params.id);

  if (!post?.url) {
    return redirect("/");
  }

  return redirect(post.url);
}