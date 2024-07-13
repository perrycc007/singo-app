// components/SongList.tsx
import React from "react";
import { SongData } from "../../types";
import { useRouter, useSearchParams } from "next/navigation";
interface SongListProps {
  songs: SongData[];
}

const SongList: React.FC<SongListProps> = ({ songs }) => {
  const router = useRouter();
  console.log(songs);

  const handleSongClick = (songId: any) => {
    router.push(`/song?songId=${songId}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Songs</h2>
      <ul>
        {songs.map((song) => (
          <li
            key={song.id}
            className="p-4 mb-2 bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
            onClick={() => handleSongClick(song.id)}
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
