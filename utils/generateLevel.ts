// utils/generateLevels.ts
import {
  SongData,
  Level,
  Practice,
  Exercise,
  Vocabulary,
  Sentence,
} from "../types";

const generateLevels = (songData: SongData): Level[] => {
  const practices: Practice[] = [];

  // Create practices from vocabularies and sentences
  songData.sentences.forEach((sentence) => {
    sentence.vocabularies.forEach((vocab) => {
      practices.push({
        type: "vocab",
        content: vocab,
      });
    });
    practices.push({
      type: "sentence",
      content: sentence,
    });
  });

  // Repeat vocabularies if not enough for minimum levels
  const minPractices = 15 * 6 * 10; // 15 practices per exercise, 6 exercises per level, 10 levels
  while (practices.length < minPractices) {
    practices.push(...practices);
  }

  // Generate levels and exercises
  const levels: Level[] = [];
  let practiceIndex = 0;
  let sentenceRatio = 0.1;

  while (practiceIndex < practices.length) {
    const exercises: Exercise[] = [];

    for (let exerciseIndex = 0; exerciseIndex < 6; exerciseIndex++) {
      const exercisePractices: Practice[] = [];

      for (let practiceCount = 0; practiceCount < 15; practiceCount++) {
        if (practiceIndex < practices.length) {
          exercisePractices.push(practices[practiceIndex]);
          practiceIndex++;
        }
      }

      exercises.push({ practices: exercisePractices });
    }

    levels.push({ exercises });
    sentenceRatio += 0.1; // Increase sentence ratio for higher levels
  }

  return levels;
};

export default generateLevels;
