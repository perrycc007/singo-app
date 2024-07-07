// components/Level.tsx
import React, { useState } from "react";
import { Level, Vocabulary, Sentence } from "../types";
import ExerciseComponent from "./Exercise";

interface LevelProps {
  level: Level;
  levelNumber: number;
  allVocabularies: Vocabulary[];
  allSentences: Sentence[];
  onComplete: () => void;
}

const LevelComponent: React.FC<LevelProps> = ({
  level,
  levelNumber,
  allVocabularies,
  allSentences,
  onComplete,
}) => {
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(
    new Array(level.exercises.length).fill(false)
  );
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);

  const handleCompleteExercise = (index: number) => {
    const updated = [...completedExercises];
    updated[index] = true;
    setCompletedExercises(updated);

    if (updated.every((completed) => completed)) {
      onComplete();
    } else {
      setCurrentExercise(null);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Level {levelNumber}</h2>
      {currentExercise === null ? (
        level.exercises.map((exercise, index) => (
          <button
            key={index}
            onClick={() => setCurrentExercise(index)}
            className={`block w-full text-left p-2 my-1 rounded ${
              completedExercises[index] ? "bg-green-300" : "bg-white"
            } shadow`}
          >
            Exercise {index + 1}
          </button>
        ))
      ) : (
        <ExerciseComponent
          exercise={level.exercises[currentExercise]}
          exerciseNumber={currentExercise + 1}
          allVocabularies={allVocabularies}
          allSentences={allSentences}
          onComplete={() => handleCompleteExercise(currentExercise)}
        />
      )}
    </div>
  );
};

export default LevelComponent;
