// components/Practice/SentenceFormation.tsx
import React, { useState, useEffect } from "react";
import { Question, Vocabulary } from "@/types";
import { getRandomElements } from "@/utils/utils";

interface SentenceFormationProps {
  question: Question;
  onCheck: (isCorrect: boolean) => void;
  onNext: () => void;
  vocabulary: Vocabulary[];
}

const SentenceFormationQuestion: React.FC<SentenceFormationProps> = ({
  question,
  onCheck,
  onNext,
  vocabulary,
}) => {
  const [collectedWords, setCollectedWords] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    // Break down the correct answer into smaller parts
    const correctWords = breakIntoSmallerParts(question.correctAnswer);
    const similarLengthOptions = getRandomElements(
      vocabulary.filter((vocab) =>
        question.type === "sentence-formation-reading-meaning" ||
        question.type === "sentence-formation-audio-meaning"
          ? !correctWords.includes(vocab.meaning)
          : !correctWords.includes(vocab.word)
      ),
      2
    ).map((vocab) =>
      question.type === "sentence-formation-reading-meaning" ||
      question.type === "sentence-formation-audio-meaning"
        ? vocab.meaning
        : vocab.word
    );

    const shuffledOptions = [...correctWords, ...similarLengthOptions].sort(
      () => Math.random() - 0.5
    );

    setOptions(shuffledOptions);
  }, [question, vocabulary]);

  const breakIntoSmallerParts = (answer: string): string[] => {
    if (
      question.type === "sentence-formation-reading-meaning" ||
      question.type === "sentence-formation-audio-meaning"
    ) {
      return answer.split(" ");
    } else {
      const parts: string[] = [];
      for (let i = 0; i < answer.length; i += 2) {
        parts.push(answer.slice(i, i + 2));
      }
      return parts;
    }
  };

  const handleOptionClick = (word: string) => {
    if (!isChecked) {
      setOptions(options.filter((option) => option !== word));
      setCollectedWords([...collectedWords, word]);
    }
  };

  const handleCollectedWordClick = (word: string) => {
    if (!isChecked) {
      setCollectedWords(
        collectedWords.filter((collectedWord) => collectedWord !== word)
      );
      setOptions([...options, word]);
    }
  };

  const handleCheck = () => {
    const userAnswer =
      question.type === "sentence-formation-reading-meaning" ||
      question.type === "sentence-formation-audio-meaning"
        ? collectedWords.join(" ")
        : collectedWords.join("");
    const isAnswerCorrect = userAnswer === question.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    onCheck(isAnswerCorrect);
    setShowNextButton(true);
    setIsChecked(true);
  };

  const handleNext = () => {
    setShowNextButton(false);
    setIsCorrect(null);
    setCollectedWords([]);
    setOptions([]);
    setIsChecked(false);
    onNext();
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <p className="text-black">
        {question.text}, {question.correctAnswer}
      </p>
      {question.audioUrl && (
        <audio controls src={question.audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}
      <div className="mt-2 p-4 border-dashed border-2 border-gray-300 min-h-[50px] flex flex-wrap">
        {collectedWords.map((word, index) => (
          <button
            key={index}
            onClick={() => handleCollectedWordClick(word)}
            className="p-2 m-1 bg-gray-700 rounded cursor-pointer"
          >
            {word}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap mt-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="p-2 m-1 bg-gray-400 rounded cursor-pointer"
          >
            {option}
          </button>
        ))}
      </div>
      {isCorrect !== null && (
        <div
          className={`mt-2 p-2 rounded ${
            isCorrect ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {isCorrect ? "Correct!" : "Incorrect."}
        </div>
      )}
      {showNextButton ? (
        <button
          onClick={handleNext}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      ) : (
        <button
          onClick={handleCheck}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
          disabled={collectedWords.length === 0}
        >
          Check
        </button>
      )}
    </div>
  );
};

export default SentenceFormationQuestion;
