"use client";

import { useState } from "react";

export default function UrlForm() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setShortUrl("");

    const res = await fetch("/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, alias }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
    } else {
      const location = `${window.location.origin}/url/${alias}`;
      setShortUrl(location);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Enter alias (e.g., mylink)"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Shorten URL
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {shortUrl && (
        <div className="text-green-600 break-words">
          Short URL: <a href={shortUrl} className="underline">{shortUrl}</a>
        </div>
      )}
    </form>
  );
}
