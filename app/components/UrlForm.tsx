'use client';
import { useState } from 'react';
import ShortUrlDisplay from './ShortUrlDisplay';
import ErrorMessage from './ErrorMessage';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    const res = await fetch('/api/short-url', {
      method: 'POST',
      body: JSON.stringify({ url, alias }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
    } else {
      setShortUrl(`${window.location.origin}/api/${data.alias}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Enter full URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Enter custom alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        required
      />
      <button
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        type="submit"
      >
        Shorten URL
      </button>
      {error && <ErrorMessage message={error} />}
      {shortUrl && <ShortUrlDisplay shortUrl={shortUrl} />}
    </form>
  );
}
