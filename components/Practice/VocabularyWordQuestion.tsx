// components/Practice/VocabularyWordQuestion.tsx
import React, { useState, useEffect } from "react";
import { Question } from "@/types";

interface VocabularyWordQuestionProps {
  question: Question;
  onNext: () => void;
  vocabulary: any[];
}

const VocabularyWordQuestion: React.FC<VocabularyWordQuestionProps> = ({
  question,
  vocabulary,
  onNext,
}) => {
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    // Generate multiple-choice options
    if (question.type.startsWith("vocabulary")) {
      const correctAnswer = question.Vocabulary.meaning;

      const getRandomElements = (array: any[], count: number) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
      if (correctAnswer) {
        const similarLengthOptions = getRandomElements(
          vocabulary.filter((vocab) => vocab.pronunciation !== correctAnswer),
          3
        ).map((vocab) => vocab.meaning);

        // Ensure options only contain one correct answer
        const uniqueOptions = Array.from(
          new Set([...similarLengthOptions, correctAnswer])
        ).sort(() => Math.random() - 0.5);
        setOptions(uniqueOptions);
      }
    }
  }, [question, vocabulary]);

  const handleSubmit = () => {
    // Handle answer submission logic here
    const isCorrect = selectedOption === question.correctAnswer;
    // Add submission logic to send `isCorrect` status to the backend or track it
    onNext();
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <p>{question.text}</p>
      {options.map((option, index) => (
        <div key={index} className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="form-radio"
            />
            <span className="ml-2">{option}</span>
          </label>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        disabled={!selectedOption}
      >
        Next
      </button>
    </div>
  );
};

export default VocabularyWordQuestion;
