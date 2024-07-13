// components/Practice/MeaningQuestion.tsx
import React, { useState } from "react";
import { Question } from "@/types";

interface MeaningQuestionProps {
  question: Question;
  onNext: () => void;
}

const MeaningQuestion: React.FC<MeaningQuestionProps> = ({
  question,
  onNext,
}) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    // Handle answer submission logic here
    onNext();
  };

  return (
    <div className="p-4 mb-4 bg-white shadow rounded">
      <p>{question.text}</p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="mt-2 p-2 border rounded w-full"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
};

export default MeaningQuestion;
