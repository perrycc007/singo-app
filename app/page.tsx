"use client";
import React, { useState } from "react";
import axios from "axios";
import VocabularyTranslationPractice from "../components/VocabularyTranslationPractice";
import VocabularyPronunciationPractice from "../components/VocabularyPronunciationPractice";
import SentenceTranslationPractice from "../components/SentenceTranslationPractice";
import SentencePronunciationPractice from "../components/SentencePronunciationPractice";
import VocabularyListeningPractice from "../components/VocabularyListeningPractice";
import SentenceListeningPractice from "../components/SentenceListeningPractice";
import { SongData } from "./types";
import "tailwindcss/tailwind.css";

const Home: React.FC = () => {
  const [lyrics, setLyrics] = useState<string>("");
  const [songData, setSongData] = useState<SongData | null>(null);

  const handleLyricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLyrics(e.target.value);
  };

  const handleGenerateData = async () => {
    const response = await axios.post<SongData>(
      `${process.env.NEXT_PUBLIC_API_URL}/openai-tts/generate`,
      {
        lyrics,
      }
    );
    setSongData(response.data);
  };

  return (
    <div className="min-h-screen bg-black-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Japanese Song Learning App
      </h1>
      <textarea
        value={lyrics}
        onChange={handleLyricsChange}
        placeholder="Enter Japanese lyrics"
        className="w-full max-w-md p-2 bg-black-100 border border-gray-00 rounded-md mb-4"
      />
      <button
        onClick={handleGenerateData}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Generate Data
      </button>
      {songData && (
        <div className="mt-8 w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {songData.song.title} by {songData.song.artist}
          </h2>
          <div className="space-y-4">
            <VocabularyTranslationPractice lyrics={songData.song.lyrics} />
            <VocabularyPronunciationPractice lyrics={songData.song.lyrics} />
            <SentenceTranslationPractice lyrics={songData.song.lyrics} />
            <SentencePronunciationPractice lyrics={songData.song.lyrics} />
            <VocabularyListeningPractice lyrics={songData.song.lyrics} />
            <SentenceListeningPractice lyrics={songData.song.lyrics} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
