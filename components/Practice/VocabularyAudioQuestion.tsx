// components/Practice/VocabularyAudioQuestion.tsx
import React, { useState } from "react";
import { Question } from "@/types";

interface VocabularyAudioQuestionProps {
  question: Question;
  onNext: () => void;
}

const VocabularyAudioQuestion: React.FC<VocabularyAudioQuestionProps> = ({
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
      <audio controls src={question.audioUrl}>
        Your browser does not support the audio element.
      </audio>
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

export default VocabularyAudioQuestion;
