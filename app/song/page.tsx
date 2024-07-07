// pages/songs.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { SongData, Level, Vocabulary, Sentence } from "../../types";
import LevelComponent from "../../components/Level";
import generateLevels from "@/utils/generateLevel";
const SongPage: React.FC = () => {
  const [songData, setSongData] = useState<SongData | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      axios
        .get<SongData>(`${process.env.NEXT_PUBLIC_API_URL}/songs/${id}`)
        .then((response) => {
          setSongData(response.data);
          setLevels(generateLevels(response.data));
        })
        .catch((error) => {
          console.error("Error fetching song data:", error);
        });
    }
  }, [id]);

  if (!songData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">
        {songData.title} by {songData.artist}
      </h1>
      {currentLevel === null ? (
        levels.map((level, index) => (
          <button
            key={index}
            onClick={() => setCurrentLevel(index)}
            className="block w-full text-left p-2 my-1 rounded bg-white shadow"
          >
            Level {index + 1}
          </button>
        ))
      ) : (
        <LevelComponent
          level={levels[currentLevel]}
          levelNumber={currentLevel + 1}
          allVocabularies={songData.sentences.flatMap(
            (sentence) => sentence.vocabularies
          )}
          allSentences={songData.sentences}
          onComplete={() => setCurrentLevel(null)}
        />
      )}
    </div>
  );
};

export default SongPage;
