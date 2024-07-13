// components/Practice/SentenceFormationQuestion.tsx
import React, { useState, useEffect } from "react";
import { Question, Vocabulary } from "@/types";

interface SentenceFormationQuestionProps {
  question: Question;
  onNext: () => void;
  vocabulary: Vocabulary[];
}

const SentenceFormationQuestion: React.FC<SentenceFormationQuestionProps> = ({
  question,
  vocabulary,
  onNext,
}) => {
  const [sentenceWords, setSentenceWords] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);

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

  const handleSubmit = () => {
    const userAnswer = sentenceWords.join(" ");
    const isCorrect = userAnswer === question.correctAnswer;
    // Handle answer submission logic here
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
      <button
        onClick={handleSubmit}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        disabled={sentenceWords.length === 0}
      >
        Next
      </button>
    </div>
  );
};

export default SentenceFormationQuestion;
