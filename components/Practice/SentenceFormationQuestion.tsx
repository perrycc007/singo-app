// components/Practice/SentenceFormationQuestion.tsx
import React, { useState, useEffect } from "react";
import { Question, Vocabulary } from "@/types";

interface SentenceFormationQuestionProps {
  question: Question;
  onCheck: (isCorrect: boolean) => void;
  onNext: () => void;
  vocabulary: Vocabulary[];
}

const SentenceFormationQuestion: React.FC<SentenceFormationQuestionProps> = ({
  question,
  onCheck,
  onNext,
  vocabulary,
}) => {
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Shuffle and prepare options
    const correctWords = breakIntoSmallerParts(question.correctAnswer);
    const similarLengthOptions = vocabulary
      .filter((vocab) => !correctWords.includes(vocab.word))
      .slice(0, 5) // Add 5 additional options for confusion
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
    setSentenceWords([...sentenceWords, word]);
  };

  const handleSentenceWordClick = (word: string) => {
    setSentenceWords(
      sentenceWords.filter((sentenceWord) => sentenceWord !== word)
    );
    setOptions([...options, word]);
  };

  const handleCheck = () => {
    const userAnswer = sentenceWords.join(" ");
    const isAnswerCorrect = userAnswer === question.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    onCheck(isAnswerCorrect);
    setShowNextButton(true);
  };

  const handleNext = () => {
    setShowNextButton(false);
    setIsCorrect(null);
    setSentenceWords([]);
    setOptions([]);
    onNext();
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <p>{question.text}</p>
      {question.audioUrl && (
        <audio controls src={question.audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}
      <div className="flex flex-wrap mt-4 border p-2 rounded">
        {sentenceWords.map((word, index) => (
          <div
            key={index}
            onClick={() => handleSentenceWordClick(word)}
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
      {isCorrect !== null && (
        <div
          className={`mt-2 p-2 rounded ${
            isCorrect ? "bg-green-200" : "bg-red-200"
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
          disabled={sentenceWords.length === 0}
        >
          Check
        </button>
      )}
    </div>
  );
};

export default SentenceFormationQuestion;
