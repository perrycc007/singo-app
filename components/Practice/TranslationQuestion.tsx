// components/Practice/TranslationQuestion.tsx
import React, { useState, useEffect } from "react";
import { Question, Vocabulary } from "@/types";

interface TranslationQuestionProps {
  question: Question;
  onNext: () => void;
  vocabulary: Vocabulary[];
}

const TranslationQuestion: React.FC<TranslationQuestionProps> = ({
  question,
  vocabulary,
  onNext,
}) => {
  const [collectedWords, setCollectedWords] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    // Break down the correct answer into individual words
    const correctWords = question.correctAnswer.split(" ");
    const similarLengthOptions = vocabulary
      .filter((vocab) => !correctWords.includes(vocab.word))
      .slice(0, 5) // Add 5 additional options for confusion
      .map((vocab) => vocab.meaning);

    const shuffledOptions = [...correctWords, ...similarLengthOptions].sort(
      () => Math.random() - 0.5
    );

    setOptions(shuffledOptions);
  }, [question, vocabulary]);

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
    const isCorrect = userAnswer === question.correctAnswer;
    // Handle answer submission logic here
    onNext();
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <p>{question.text}</p>
      <div className="flex flex-wrap mt-4 border p-2 rounded">
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
            className="p-2 m-1 bg-blue-200 rounded cursor-pointer"
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

export default TranslationQuestion;
