// types.ts
export interface Vocabulary {
  word: string;
  meaning: string;
  pronunciation: string;
  audioUrl: string;
}

export interface Sentence {
  line: string;
  translation: string;
  pronunciation: string;
  audioUrl: string;
  vocabularies: Vocabulary[];
}

export interface Practice {
  type: "vocab" | "sentence";
  content: Vocabulary | Sentence;
}

export interface Exercise {
  practices: Practice[];
}

export interface Level {
  exercises: Exercise[];
}

export interface SongData {
  title: string;
  artist: string;
  sentences: Sentence[];
}
