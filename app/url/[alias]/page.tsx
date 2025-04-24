// app/url/[alias]/page.tsx
import getPostById from "@/lib/getPostById";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

interface RedirectAliasProps {
  params: { alias: string };
}

export default async function RedirectAlias({ params }: RedirectAliasProps) {
  const post = await getPostById(params.alias);

  if (!post?.url) {
    return redirect("/");
  }

  return redirect(post.url);
}

export const metadata: Metadata = {
  title: "Redirecting...",
};