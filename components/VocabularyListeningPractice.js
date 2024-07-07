import React, { useState } from "react";

const VocabularyListeningPractice = ({ lyrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const vocabList = lyrics.flatMap((line) => line.vocabulary);
  const currentVocab = vocabList[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabList.length);
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-sm">
      <h3 className="text-xl font-bold mb-2">Vocabulary Listening Practice</h3>
      <p className="text-lg mb-2">
        Listen to the word and answer the following:
      </p>
      <audio src={currentVocab.audioUrl} controls />
      <p>What is the English meaning of this word?</p>
      <p className="text-md text-gray-700 mb-4">{currentVocab.meaning}</p>
      <p>What is the Japanese word you heard?</p>
      <p className="text-md text-gray-700 mb-4">{currentVocab.word}</p>
      <p>What is the Romanized pronunciation of this word?</p>
      <p className="text-md text-gray-700 mb-4">{currentVocab.pronunciation}</p>
      <button
        onClick={handleNext}
        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
      >
        Next
      </button>
    </div>
  );
};

export default VocabularyListeningPractice;
