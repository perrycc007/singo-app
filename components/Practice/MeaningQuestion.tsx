// components/Practice/MeaningQuestion.tsx
import React, { useState, useEffect } from "react";
import { Question, Vocabulary } from "@/types";

interface MeaningQuestionProps {
  question: Question;
  onNext: () => void;
  vocabulary: Vocabulary[];
}

const MeaningQuestion: React.FC<MeaningQuestionProps> = ({
  question,
  vocabulary,
  onNext,
}) => {
  const [collectedWords, setCollectedWords] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // Break down the correct answer into smaller parts
    const correctWords = breakIntoSmallerParts(question.correctAnswer);
    const similarLengthOptions = vocabulary
      .filter((vocab) => !correctWords.includes(vocab.word))
      .slice(0, 5)
      .map((vocab) => vocab.word);

    const shuffledOptions = [...correctWords, ...similarLengthOptions].sort(
      () => Math.random() - 0.5
    );

    setOptions(shuffledOptions);
  }, [question, vocabulary]);

  const breakIntoSmallerParts = (answer: string): string[] => {
    const parts: string[] = [];
    for (let i = 0; i < answer.length; i += 2) {
      parts.push(answer.slice(i, i + 2));
    }
    return parts;
  };

  const handleOptionClick = (word: string) => {
    setOptions(options.filter((option) => option !== word));
    setCollectedWords([...collectedWords, word]);
  };

  const handleCollectedWordClick = (word: string) => {
    setCollectedWords(
      collectedWords.filter((collectedWord) => collectedWord !== word)
    );
    setOptions([...options, word]);
  };

  const handleSubmit = () => {
    const userAnswer = collectedWords.join(" ");
    if (userAnswer === question.correctAnswer) {
      // Correct answer logic
    } else {
      // Incorrect answer logic
    }
    onNext();
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <p>{question.text}</p>
      <div className="mt-2 p-4 border-dashed border-2 border-gray-300 min-h-[50px] flex flex-wrap">
        {collectedWords.map((word, index) => (
          <div
            key={index}
            onClick={() => handleCollectedWordClick(word)}
            className="p-2 m-1 bg-gray-200 rounded cursor-pointer"
          >
            {word}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap mt-4">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className="p-2 m-1 bg-gray-200 rounded cursor-pointer"
          >
            {option}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        disabled={collectedWords.length === 0}
      >
        Next
      </button>
    </div>
  );
};

export default MeaningQuestion;
