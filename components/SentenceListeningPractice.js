import React, { useState } from "react";

const SentenceListeningPractice = ({ lyrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentLine = lyrics[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % lyrics.length);
  };

  return (
    <div>
      <h3>Sentence Listening Practice</h3>
      <p>Listen to the sentence and answer the following:</p>
      <audio src={currentLine.audioUrl} controls />
      <p>What is the English translation of this sentence?</p>
      <p>{currentLine.translation}</p>
      <p>What is the Japanese sentence you heard?</p>
      <p>{currentLine.line}</p>
      <p>What is the Romanized pronunciation of this sentence?</p>
      <p>{currentLine.pronunciation}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SentenceListeningPractice;
