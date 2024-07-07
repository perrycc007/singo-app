"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [lyrics, setLyrics] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const router = useRouter();

  const handleLyricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(e.target.value);
  };

  const handleGenerateData = async () => {
    const response = await axios.post<{ songUrl: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/openai-tts/generate`,
      { lyrics }
    );
    router.push(response.data.songUrl);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-blue-600 w-full py-4 shadow-md">
        <h1 className="text-3xl font-bold text-white text-center">
          Japanese Song Learning App
        </h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">Enter Japanese Lyrics</h2>
          <textarea
            value={lyrics}
            onChange={handleLyricsChange}
            placeholder="Enter Japanese lyrics"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            rows={6}
          />
          <button
            onClick={handleGenerateData}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Generate Data
          </button>
        </div>
      </main>
      <footer className="w-full py-4 bg-gray-800">
        <p className="text-center text-white">
          &copy; {new Date().getFullYear()} Japanese Song Learning App
        </p>
      </footer>
    </div>
  );
};

export default Home;
