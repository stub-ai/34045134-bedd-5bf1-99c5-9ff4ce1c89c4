import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = `/api/download?url=${encodeURIComponent(url)}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube video URL"
          required
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Download as MP3</button>
      </form>
    </main>
  );
}