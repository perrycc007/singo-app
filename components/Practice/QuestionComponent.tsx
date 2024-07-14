// components/Practice/QuestionComponent.tsx
import React from "react";
import { Question } from "@/types";
import SentenceFormationQuestion from "./SentenceFormationQuestion";
import VocabularyQuestion from "./VocabularyQuestion";

interface QuestionComponentProps {
  question: Question;
  vocabulary: any;
  onCheck: (questionId: number, isCorrect: boolean) => void;
  onNext: () => void;
}

const componentMapping: { [key: string]: React.FC<any> } = {
  "sentence-formation-reading-meaning": SentenceFormationQuestion,
  "sentence-formation-reading-word": SentenceFormationQuestion,
  "sentence-formation-audio-word": SentenceFormationQuestion,
  "sentence-formation-audio-meaning": SentenceFormationQuestion,
  "vocabulary-reading-meaning": VocabularyQuestion,
  "vocabulary-reading-pronunciation": VocabularyQuestion,
  "vocabulary-reading-word": VocabularyQuestion,
  "vocabulary-audio-meaning": VocabularyQuestion,
  "vocabulary-audio-pronunciation": VocabularyQuestion,
  "vocabulary-audio-word": VocabularyQuestion,
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  vocabulary,
  onCheck,
  onNext,
}) => {
  const handleCheck = (isCorrect: boolean) => {
    onCheck(question.id, isCorrect);
  };

  const Component = componentMapping[question.type];

  return Component ? (
    <Component
      question={question}
      vocabulary={vocabulary}
      onCheck={handleCheck}
      onNext={onNext}
    />
  ) : null;
};

export default QuestionComponent;
