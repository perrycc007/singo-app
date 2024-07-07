// components/Exercise.tsx
import React, { useState } from "react";
import { Exercise, Vocabulary, Sentence } from "../types";
import PracticeComponent from "./Practice";

interface ExerciseProps {
  exercise: Exercise;
  exerciseNumber: number;
  allVocabularies: Vocabulary[];
  allSentences: Sentence[];
  onComplete: () => void;
}

const ExerciseComponent: React.FC<ExerciseProps> = ({
  exercise,
  exerciseNumber,
  allVocabularies,
  allSentences,
  onComplete,
}) => {
  const [completedPractices, setCompletedPractices] = useState<boolean[]>(
    new Array(exercise.practices.length).fill(false)
  );
  const [currentPractice, setCurrentPractice] = useState<number | null>(0);

  const handleCompletePractice = (index: number) => {
    const updated = [...completedPractices];
    updated[index] = true;
    setCompletedPractices(updated);

    const nextPractice = updated.findIndex((completed) => !completed);
    if (nextPractice === -1) {
      onComplete();
    } else {
      setCurrentPractice(nextPractice);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4">
      <h3 className="text-lg font-medium mb-2">Exercise {exerciseNumber}</h3>
      {currentPractice !== null && (
        <PracticeComponent
          practice={exercise.practices[currentPractice]}
          practiceNumber={currentPractice + 1}
          allVocabularies={allVocabularies}
          allSentences={allSentences}
          onComplete={() => handleCompletePractice(currentPractice)}
        />
      )}
    </div>
  );
};

export default ExerciseComponent;
