// components/Practice.tsx
import React, { useState, useEffect } from "react";
import { Practice, Vocabulary, Sentence } from "../types";

interface PracticeProps {
  practice: Practice;
  practiceNumber: number;
  allVocabularies: Vocabulary[];
  allSentences: Sentence[];
  onComplete: () => void;
}

const PracticeComponent: React.FC<PracticeProps> = ({
  practice,
  practiceNumber,
  allVocabularies,
  allSentences,
  onComplete,
}) => {
  const isVocabulary = (content: any): content is Vocabulary => {
    return (content as Vocabulary).word !== undefined;
  };

  const [choices, setChoices] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const getRandomChoices = () => {
      const vocabularies = allVocabularies;

      const incorrectChoices = vocabularies
        .filter((vocab) =>
          isVocabulary(practice.content)
            ? vocab.meaning !== practice.content.meaning
            : vocab.pronunciation !==
              (practice.content as Sentence).pronunciation
        )
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((vocab) =>
          isVocabulary(practice.content) ? vocab.meaning : vocab.pronunciation
        );

      const correctAnswer = isVocabulary(practice.content)
        ? practice.content.meaning
        : (practice.content as Sentence).pronunciation;

      const allChoices = [...incorrectChoices, correctAnswer].sort(
        () => 0.5 - Math.random()
      );

      return allChoices;
    };

    setChoices(getRandomChoices());
  }, [practice, allVocabularies]);

  const handleAnswerClick = (choice: string) => {
    setSelectedAnswer(choice);
    setIsCorrect(
      isVocabulary(practice.content)
        ? choice === practice.content.meaning
        : choice === (practice.content as Sentence).pronunciation
    );
  };

  const handleNext = () => {
    onComplete();
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="p-2 bg-gray-200 rounded mb-2">
      <h4 className="text-md font-medium">Practice {practiceNumber}</h4>
      {isVocabulary(practice.content) ? (
        <div>
          <p>Word: {practice.content.word}</p>
          <div className="mb-4">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(choice)}
                className={`block w-full text-left p-2 my-1 rounded ${
                  selectedAnswer === choice
                    ? isCorrect
                      ? "bg-green-300"
                      : "bg-red-300"
                    : "bg-white"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Next
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>Sentence: {(practice.content as Sentence).line}</p>
          <div className="mb-4">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(choice)}
                className={`block w-full text-left p-2 my-1 rounded ${
                  selectedAnswer === choice
                    ? isCorrect
                      ? "bg-green-300"
                      : "bg-red-300"
                    : "bg-white"
                }`}
              >
                {choice}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <button
              onClick={handleNext}
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticeComponent;
