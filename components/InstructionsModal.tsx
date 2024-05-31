import React from 'react';

interface InstructionsModalProps {
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center" style={{zIndex:"1000" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-black mb-4">How to Play</h2>
        <p className="mb-4 text-gray-800">
          Welcome to the city guessing game! You have a score of 1500 kilometers. Each round, you need to place the pin on the map where you think the city is located.
          The closer your pin is to the actual city, the fewer kilometers you will lose. If your distance is within 50 kilometers of the city, you will find the city and proceed to the next one.
          The game ends when your score reaches 0. Try to find as many cities as possible!
        </p>
        <button
          onClick={onClose}
          className="mt-4 z-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default InstructionsModal;
