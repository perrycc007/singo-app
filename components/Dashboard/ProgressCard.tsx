import React from "react";
import { Progress } from "../../types";

interface ProgressCardProps {
  progress: Progress;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  return (
    <div className="p-4 mb-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-2">
        Progress for {progress.song.title}
      </h2>
      <p>
        <strong>Current Level:</strong> {progress.currentLevel}
      </p>
      <p>
        <strong>Current Step:</strong> {progress.currentStep}
      </p>
      <p>
        <strong>Completed Exercises:</strong> {progress.completedExercises}
      </p>
      <p>
        <strong>Last Practice Date:</strong>{" "}
        {new Date(progress.lastPracticeDate).toLocaleDateString()}
      </p>
      <div>
        <h3 className="text-lg font-semibold mt-4">Steps:</h3>
        <ul>
          {progress.steps.map((step) => (
            <li key={step.id} className="mb-2">
              <p>
                <strong>Step {step.step.number}:</strong> Accuracy:{" "}
                {step.accuracy}%
              </p>
              <ul>
                {step.questions.map((question) => (
                  <li key={question.id} className="ml-4">
                    <p>{question.question.text}</p>
                    <p>Accuracy: {question.accuracy}%</p>
                    <p>
                      Last Encounter:{" "}
                      {new Date(question.lastEncounter).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProgressCard;
