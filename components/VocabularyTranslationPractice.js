import React, { useState } from "react";

const VocabularyTranslationPractice = ({ lyrics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const vocabList = lyrics.flatMap((line) => line.vocabulary);
  const currentVocab = vocabList[currentIndex];

  const getRandomChoices = () => {
    const incorrectChoices = vocabList
      .filter((vocab) => vocab.word !== currentVocab.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((vocab) => vocab.meaning);

    const allChoices = [...incorrectChoices, currentVocab.meaning].sort(
      () => 0.5 - Math.random()
    );

    return allChoices;
  };

  const [choices, setChoices] = useState(getRandomChoices());

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabList.length);
    setChoices(getRandomChoices());
    setSelectedAnswer(null);
    setIsCorrect(false);
  };

  const handleAnswerClick = (choice) => {
    setSelectedAnswer(choice);
    setIsCorrect(choice === currentVocab.meaning);
  };

  return (
    <div className="p-4 border rounded-md bg-gray-50 shadow-sm">
      <h3 className="text-xl font-bold mb-2">
        Vocabulary Translation Practice
      </h3>
      <p className="text-lg mb-2">
        What is the English meaning of "{currentVocab.word}"?
      </p>
      <div className="mb-4">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(choice)}
            className={`block w-full text-left p-2 my-1 rounded ${
              selectedAnswer === choice
                ? isCorrect
                  ? "bg-green-300"
                  : "bg-red-300"
                : "bg-white"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <button
          onClick={handleNext}
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default VocabularyTranslationPractice;
