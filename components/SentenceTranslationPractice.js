import React, { useState } from "react";

const SentenceTranslationPractice = ({ lyrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLine = lyrics[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lyrics.length);
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-sm">
      <h3>Sentence Translation Practice</h3>
      <p>What is the English translation of this sentence?</p>
      <p>{currentLine.line}</p>
      <p>{currentLine.translation}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SentenceTranslationPractice;
