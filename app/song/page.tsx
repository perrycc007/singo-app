// pages/songs/[songId].tsx
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store";
import { Song, Progress } from "@/types";
import { getToken } from "@/utils/auth";
import Modal from "@/components/Modal";

const SongPage: React.FC = () => {
  const { userId } = useStore();
  const [song, setSong] = useState<Song | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [levels, setLevels] = useState<{ level: number; maxStep: number }[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalButtonLabel, setModalButtonLabel] = useState("");
  const [modalButtonAction, setModalButtonAction] = useState<() => void>(
    () => {}
  );
  const router = useRouter();
  const searchParams = useSearchParams();

  const songId = searchParams.get("songId");

  useEffect(() => {
    const token = getToken();
    const fetchSongDetails = async () => {
      console.log("run");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/song/details?songId=${songId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      setSong(response.data.song);
      setProgress(response.data.progress);
      setLevels(response.data.levels);
    };

    if (songId && token) {
      fetchSongDetails();
    }
  }, [songId, userId]);

  if (!song) {
    return <div>Loading...</div>;
  }

  const handleStepClick = (levelIndex: number, stepIndex: number) => {
    const selectedLevel = levels[levelIndex];
    const isCompleted = progress
      ? progress.currentLevel > selectedLevel.level ||
        (progress.currentLevel === selectedLevel.level &&
          progress.currentStep >= stepIndex + 1)
      : false;

    if (isCompleted) {
      setModalTitle("Revise Step");
      setModalMessage("Let's revise this step.");
      setModalButtonLabel("Revise");
      setModalButtonAction(() =>
        router.push(
          `/practice?songId=${songId}&level=${selectedLevel.level}&step=${
            stepIndex + 1
          }`
        )
      );
      setIsModalOpen(true);
    } else if (
      progress &&
      progress.currentLevel === selectedLevel.level &&
      progress.currentStep === stepIndex + 1 &&
      progress.currentPractice < 6
    ) {
      setModalTitle("Step In Progress");
      setModalMessage(
        `You have completed ${progress.currentPractice}/6 exercises for this step.`
      );
      setModalButtonLabel("Continue");
      setModalButtonAction(() =>
        router.push(
          `/practice?songId=${songId}&level=${selectedLevel.level}&step=${
            stepIndex + 1
          }`
        )
      );
      setIsModalOpen(true);
    } else {
      // Navigate to the practice page with selected level and step
      router.push(
        `/practice?songId=${songId}&level=${selectedLevel.level}&step=${
          stepIndex + 1
        }`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">
        {song.title} by {song.artist}
      </h1>
      {levels.map((level, levelIndex) => (
        <div key={level.level}>
          <h2 className="text-2xl font-bold mb-2">Level {level.level}</h2>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: level.maxStep }).map((_, stepIndex) => {
              const isCompleted =
                progress &&
                (progress.currentLevel > level.level ||
                  (progress.currentLevel == level.level &&
                    progress.currentStep >= stepIndex + 1));
              const isDisabled = !isCompleted;

              return (
                <button
                  key={stepIndex}
                  onClick={() => handleStepClick(levelIndex, stepIndex)}
                  className={`block w-full text-left p-2 my-1 rounded bg-white shadow ${
                    isCompleted ? "bg-green-300" : ""
                  } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isDisabled}
                >
                  <div>Step {stepIndex + 1}</div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        buttonLabel={modalButtonLabel}
        buttonAction={modalButtonAction}
      />
    </div>
  );
};

export default SongPage;
