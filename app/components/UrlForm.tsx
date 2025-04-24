"use client";

import createNewUrl from "@/lib/createNewUrl";
import { useState } from "react";

export default function UrlForm() {
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url")?.toString() || "";
    const alias = formData.get("alias")?.toString() || "";

    try {
      const base = window.location.origin;
      const result = await createNewUrl(url, alias, `${base}/url/placeholder`);
      setShortUrl(`${base}/url/${result.id}`);
      setError("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="url" placeholder="Enter long URL" required />
      <input name="alias" placeholder="Enter alias" required />
      <button type="submit">Shorten</button>

      {shortUrl && (
        <p>
           Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
