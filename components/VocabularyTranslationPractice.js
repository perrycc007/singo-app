// components/VocabularyTranslationPractice.tsx
import React, { useState } from "react";

const VocabularyTranslationPractice = ({ lyrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const vocabList = lyrics.flatMap((line) => line.vocabulary);
  const currentVocab = vocabList[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabList.length);
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-sm">
      <h3 className="text-xl font-bold mb-2">
        Vocabulary Translation Practice
      </h3>
      <p className="text-lg mb-2">
        What is the English meaning of "{currentVocab.word}"?
      </p>
      <p className="text-md text-gray-700 mb-4">{currentVocab.meaning}</p>
      <button
        onClick={handleNext}
        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
      >
        Next
      </button>
    </div>
  );
};

export default VocabularyTranslationPractice;
