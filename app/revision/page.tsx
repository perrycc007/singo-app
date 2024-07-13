import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import QuestionComponent from "@/components/Practice/QuestionComponent";
import { Question } from "@/types";

const Revision: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();
  const { songId } = router.query;
  const handleAnswer = () => {};
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/revision/${songId}`
      );
      setQuestions(response.data);
    };

    if (songId) {
      fetchQuestions();
    }
  }, [songId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center">Revision</h1>
      {/* {questions.map((question, index) => (
        <QuestionComponent
          key={index}
          question={question}
          onAnswer={handleAnswer}
        />
      ))} */}
    </div>
  );
};

export default Revision;
