// components/Practice/VocabularyQuestion.tsx
import React, { useState, useEffect } from "react";
import { Question } from "@/types";

interface VocabularyQuestionProps {
  question: Question;
  onCheck: (isCorrect: boolean) => void;
  onNext: () => void;
  vocabulary: any[];
}

const VocabularyQuestion: React.FC<VocabularyQuestionProps> = ({
  question,
  onCheck,
  onNext,
  vocabulary,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [showNextButton, setShowNextButton] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const getRandomElements = (array: any[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    setIsChecked(false);
    const generateOptions = () => {
      let correctAnswer = "";
      let similarOptions: string[] = [];

      switch (question.type) {
        case "vocabulary-audio-meaning":
        case "vocabulary-reading-meaning":
          correctAnswer = question.correctAnswer;
          similarOptions = getRandomElements(
            vocabulary.filter((vocab) => vocab.meaning !== correctAnswer),
            3
          ).map((vocab) => vocab.meaning);
          break;

        case "vocabulary-audio-pronunciation":
        case "vocabulary-reading-pronunciation":
          correctAnswer = question.correctAnswer;
          similarOptions = getRandomElements(
            vocabulary.filter((vocab) => vocab.pronunciation !== correctAnswer),
            3
          ).map((vocab) => vocab.pronunciation);
          break;

        case "vocabulary-audio-word":
        case "vocabulary-reading-word":
          correctAnswer = question.correctAnswer;
          similarOptions = getRandomElements(
            vocabulary.filter((vocab) => vocab.word !== correctAnswer),
            3
          ).map((vocab) => vocab.word);
          break;

        default:
          return;
      }

      const uniqueOptions = Array.from(
        new Set([...similarOptions, correctAnswer])
      ).sort(() => Math.random() - 0.5);
      setOptions(uniqueOptions);
    };

    generateOptions();
  }, [question, vocabulary]);

  const handleCheck = () => {
    const isAnswerCorrect = selectedOption === question.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    onCheck(isAnswerCorrect);
    setShowNextButton(true);
    setIsChecked(true);
  };

  const handleNext = () => {
    setShowNextButton(false);
    setIsCorrect(null);
    setSelectedOption("");
    setIsChecked(false);
    onNext();
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <p className="text-black">
        {" "}
        {question.text}, {question.correctAnswer}
      </p>
      {question.audioUrl && (
        <audio controls src={question.audioUrl}>
          Your browser does not support the audio element.
        </audio>
      )}
      {options.map((option, index) => (
        <div key={index} className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value={option}
              disabled={isChecked}
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="form-radio"
            />
            <span className="ml-2 text-black">{option}</span>
          </label>
        </div>
      ))}
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
          disabled={!selectedOption}
        >
          Check
        </button>
      )}
    </div>
  );
};

export default VocabularyQuestion;
