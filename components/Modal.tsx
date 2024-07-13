// components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonLabel?: string;
  buttonAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonLabel,
  buttonAction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        {buttonLabel && buttonAction && (
          <button
            onClick={() => {
              buttonAction();
              onClose();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {buttonLabel}
          </button>
        )}
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-2"
        >
          Close
        </button>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default Modal;
