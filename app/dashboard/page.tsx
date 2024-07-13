// pages/songs.tsx
"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useStore } from "@/store";
import { getToken } from "@/utils/auth"; // Assume you have these utility functions
import SongList from "@/components/Dashboard/SongList"; // Import the SongList component

const SongsPage: React.FC = () => {
  const { songs, userId, setSongs, setUserId } = useStore();

  useEffect(() => {
    const fetchSongs = async () => {
      const token = getToken(); // Extract user ID from token

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/song/user-songs`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSongs(response.data.songs);
    };

    fetchSongs();
  }, [setSongs, setUserId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Your Songs</h1>
      <SongList songs={songs} /> {/* Use the SongList component */}
    </div>
  );
};

export default SongsPage;
