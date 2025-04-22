'use client';
interface Props {
  shortUrl: string;
}

export default function ShortUrlDisplay({ shortUrl }: Props) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div className="mt-4 text-center">
      <p className="font-medium">Short URL:</p>
      <a href={shortUrl} className="text-blue-500 underline" target="_blank">
        {shortUrl}
      </a>
      <button
        onClick={handleCopy}
        className="block mt-2 bg-gray-800 text-white px-4 py-1 rounded hover:bg-gray-700"
      >
        Copy
      </button>
    </div>
  );
}
