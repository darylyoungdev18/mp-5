import { redirect } from "next/navigation";
import getPostById from "@/lib/getPostById";

type PageProps = {
  params: {
    alias: string;
  };
};

export default async function Page({ params }: PageProps) {
  const post = await getPostById(params.alias);

  if (!post?.url) {
    redirect("/");
  }

  redirect(post.url);
}