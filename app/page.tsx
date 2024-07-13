"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [lyrics, setLyrics] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLyricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(e.target.value);
  };

  const handleGenerateData = async () => {
    setLoading(true);
    const response = await axios.post<{ songUrl: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/openai-tts/generate`,
      { lyrics }
    );
    router.push(response.data.songUrl);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">
        Japanese Song Learning App
      </h1>
      <div className="mt-8">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md"
          value={lyrics}
          onChange={handleLyricsChange}
          placeholder="Enter Japanese lyrics"
        />
        {!loading && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleGenerateData}
          >
            Generate Data
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
