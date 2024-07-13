"use client";
// pages/practice.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Question } from "@/types";
import QuestionComponent from "@/components/Practice/QuestionComponent";
import { useStore } from "@/store";
const Practice: React.FC = () => {
  const { userId } = useStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const router = useRouter();
  const [vocab, setVocab] = useState();
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId");
  const level = searchParams.get("level");
  const step = searchParams.get("step");

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/learning/get-practice`,
        { songId: songId, level: level, step: step }
      );
      console.log(response.data.questions);
      setQuestions(response.data.questions);
      setVocab(response.data.vocabulary);
    };

    if (songId && level && step) {
      fetchQuestions();
    }
  }, [songId, level, step]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Practice</h1>
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <QuestionComponent
          question={questions[currentQuestionIndex]}
          vocabulary={vocab}
          onNext={handleNextQuestion}
        />
      ) : (
        <p className="text-center">No more questions available.</p>
      )}
    </div>
  );
};

export default Practice;
