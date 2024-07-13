// types.ts

export interface Vocabulary {
  id: number;
  word: string;
  meaning: string;
  pronunciation: string;
  audioUrl: string;
  sentenceId: number;
}

export interface Sentence {
  id: number;
  line: string;
  translation: string;
  pronunciation: string;
  audioUrl: string;
  songId: number;
  vocabularies: Vocabulary[];
}

export interface Question {
  id: number;
  text: string;
  type: string; // translation, pronunciation, sentence formation, etc.
  correctAnswer: string;
  sentenceId?: number;
  vocabularyId?: number;
  sentence?: Sentence;
  audioUrl: string;
  vocabulary?: Vocabulary;
}
export interface SongData {
  id: number;
  title: string;
  artist: string;
  sentences: Sentence[];
}

export interface Practice {
  id: number;
  stepId: number;
  number: number;
  questions: Question[];
}

export interface Step {
  id: number;
  levelId: number;
  number: number;
  practices: Practice[];
  questions: Question[];
}

export interface Level {
  id: number;
  songId: number;
  number: number;
  steps: Step[];
  level: any;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  levels: Level[];
  sentences: Sentence[];
}

export interface ProgressQuestion {
  id: number;
  accuracy: number;
  frequency: number;
  lastEncounter: Date;
  nextScheduledRevision: Date;
  question: Question;
}

export interface ProgressStep {
  id: number;
  step: Step;
  stepId: number;
  accuracy: number;
  questions: ProgressQuestion[];
}

export interface Progress {
  currentPractice: number;
  id: number;
  userId: number;
  songId: number;
  currentLevel: number;
  currentStep: number;
  completedExercises: number;
  lastPracticeDate: Date;
  steps: ProgressStep[];
  song: Song;
}
