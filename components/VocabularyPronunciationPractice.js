import React, { useState } from "react";

const VocabularyPronunciationPractice = ({ lyrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const vocabList = lyrics.flatMap((line) => line.vocabulary);
  const currentVocab = vocabList[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabList.length);
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-sm">
      <h3 className="text-xl font-bold mb-2">
        Vocabulary Pronunciation Practice
      </h3>
      <p className="text-lg mb-2">
        What is the Romanized pronunciation of "{currentVocab.word}"?
      </p>
      <p>{currentVocab.pronunciation}</p>
      <p>{currentVocab.pronunciation}</p>
      <button
        onClick={handleNext}
        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
      >
        Next
      </button>
    </div>
  );
};

export default VocabularyPronunciationPractice;
