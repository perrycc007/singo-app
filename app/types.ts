// types.ts

export interface Vocabulary {
  id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  audioUrl: string;
}

export interface LyricLine {
  id: string;
  line: string;
  translation: string;
  pronunciation: string;
  vocabulary: Vocabulary[];
  audioUrl: string;
}

export interface SongData {
  song: {
    title: string;
    artist: string;
    lyrics: LyricLine[];
  };
}
