import React, { useState } from "react";

const SentencePronunciationPractice = ({ lyrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLine = lyrics[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lyrics.length);
  };

  return (
    <div>
      <h3>Sentence Pronunciation Practice</h3>
      <p>What is the Romanized pronunciation of this sentence?</p>
      <p>{currentLine.line}</p>
      <p>{currentLine.pronunciation}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SentencePronunciationPractice;
