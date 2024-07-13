// components/Practice/QuestionComponent.tsx
import React from "react";
import { Question } from "@/types";
import TranslationQuestion from "./TranslationQuestion";
import MeaningQuestion from "./MeaningQuestion";
import SentenceFormationQuestion from "./SentenceFormationQuestion";
import VocabularyMeaningQuestion from "./VocabularyMeaningQuestion";
import VocabularyPronunciationQuestion from "./VocabularyPronunciationQuestion";
import VocabularyAudioQuestion from "./VocabularyAudioQuestion";
import VocabularyWordQuestion from "./VocabularyWordQuestion";

interface QuestionComponentProps {
  question: Question;
  vocabulary: any;
  onCheck: (questionId: number, isCorrect: boolean) => void;
  onNext: () => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  vocabulary,
  onCheck,
  onNext,
}) => {
  const handleCheck = (isCorrect: boolean) => {
    onCheck(question.id, isCorrect);
  };

  switch (question.type) {
    case "sentence-formation-translation":
      return (
        <TranslationQuestion
          question={question}
          vocabulary={vocabulary}
          onCheck={handleCheck}
          onNext={onNext}
        />
      );
    case "sentence-formation-meaning":
      return (
        <MeaningQuestion
          question={question}
          vocabulary={vocabulary}
          onCheck={handleCheck}
          onNext={onNext}
        />
      );
    case "sentence-formation":
      return (
        <SentenceFormationQuestion
          question={question}
          vocabulary={vocabulary}
          onCheck={handleCheck}
          onNext={onNext}
        />
      );
    case "vocabulary-meaning":
      return (
        <VocabularyMeaningQuestion
          question={question}
          vocabulary={vocabulary}
          onCheck={handleCheck}
          onNext={onNext}
        />
      );
    case "vocabulary-pronunciation":
      return (
        <VocabularyPronunciationQuestion
          question={question}
          vocabulary={vocabulary}
          onCheck={handleCheck}
          onNext={onNext}
        />
      );
    case "vocabulary-audio":
      return (
        <VocabularyAudioQuestion
          question={question}
          vocabulary={vocabulary}
          onCheck={handleCheck}
          onNext={onNext}
        />
      );
    case "vocabulary-word":
      return (
        <VocabularyWordQuestion
          question={question}
          vocabulary={vocabulary}
          onCheck={handleCheck}
          onNext={onNext}
        />
      );
    default:
      return null;
  }
};

export default QuestionComponent;
