import UrlForm from "./components/UrlForm";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">URL Shortener</h1>
        <UrlForm />
      </div>
    </main>
  );
}
