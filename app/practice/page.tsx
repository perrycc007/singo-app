// pages/practice.tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Question } from "@/types";
import QuestionComponent from "@/components/Practice/QuestionComponent";
import { useStore } from "@/store";

interface QuestionResult {
  questionId: number;
  wrongFrequency: number;
  frequency: number;
  lastEncounter: string;
}

const Practice: React.FC = () => {
  const { userId } = useStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [isReviewingWrongQuestions, setIsReviewingWrongQuestions] =
    useState<boolean>(false);
  const [vocab, setVocab] = useState<any>([]);
  const [isCompleted, setIsComplete] = useState(false);

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId");
  const level = searchParams.get("level");
  const step = searchParams.get("step");
  const practice = searchParams.get("practice");
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/learning/get-practice`,
        { songId: songId, level: level, step: step }
      );
      setQuestions(response.data.questions);
      setVocab(response.data.vocabulary);
    };

    if (songId && level && step) {
      fetchQuestions();
    }
  }, [songId, level, step]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const existingResult = questionResults.find(
        (result) => result.questionId === currentQuestion.id
      );
      if (existingResult && existingResult.wrongFrequency > 0) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }
  }, [currentQuestionIndex, questions, questionResults]);

  const handleCheckAnswer = (questionId: number, isCorrect: boolean) => {
    const now = new Date().toISOString();
    setQuestionResults((prevResults) => {
      const existingResult = prevResults.find(
        (result) => result.questionId === questionId
      );

      if (existingResult) {
        return prevResults.map((result) =>
          result.questionId === questionId
            ? {
                ...result,
                frequency: result.frequency + 1,
                wrongFrequency: result.wrongFrequency + (isCorrect ? 0 : 1),
                lastEncounter: now,
              }
            : result
        );
      } else {
        return [
          ...prevResults,
          {
            questionId: questionId,
            // wrongFrequency: isCorrect ? 0 : 1,
            wrongFrequency: isCorrect ? 0 : 1,
            frequency: 1,
            lastEncounter: now,
          },
        ];
      }
    });

    if (!isCorrect) {
      setWrongQuestions((prevWrongQuestions) => {
        if (
          !prevWrongQuestions.some((question) => question.id === questionId)
        ) {
          const question = questions.find((q) => q.id === questionId);
          if (question) {
            return [...prevWrongQuestions, question];
          }
        }
        return prevWrongQuestions;
      });
    } else {
      // Remove the question from the wrongQuestions list if answered correctly
      setWrongQuestions((prevWrongQuestions) =>
        prevWrongQuestions.filter((question) => question.id !== questionId)
      );
      console.log(
        currentQuestionIndex,
        questions.length,
        wrongQuestions.filter((question) => question.id !== questionId).length
      );
      if (
        currentQuestionIndex + 1 >= questions.length &&
        wrongQuestions.filter((question) => question.id !== questionId)
          .length == 0
      ) {
        setIsComplete(true);
        handleCompletePractice();
        router.push("/dashboard");
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else if (wrongQuestions.length > 0) {
      if (!isReviewingWrongQuestions) {
        setQuestions(wrongQuestions);
        setCurrentQuestionIndex(0);
        setIsReviewingWrongQuestions(true);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const handleCompletePractice = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/learning/complete-practice`,
      {
        userId,
        songId,
        level,
        step,
        practice,
        questionResults,
      }
    );
    router.push("/dashboard");
  };

  const progressPercentage =
    ((currentQuestionIndex +
      (isReviewingWrongQuestions ? questions.length : 0)) /
      (questions.length + wrongQuestions.length)) *
    100;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Practice</h1>
      {showNotification && (
        <div className="text-center mb-4 text-red-500">
          Time to get things right!
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {questions.length > 0 &&
      currentQuestionIndex <= questions.length + wrongQuestions.length ? (
        <QuestionComponent
          question={questions[currentQuestionIndex]}
          vocabulary={vocab}
          onCheck={(id, isCorrect) => handleCheckAnswer(id, isCorrect)}
          onNext={handleNextQuestion}
        />
      ) : isCompleted ? (
        <button
          onClick={handleCompletePractice}
          className="mt-2 p-2 bg-green-500 text-white rounded"
        >
          Done
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Practice;
