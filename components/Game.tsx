'use client';
import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import CityCard from './CityCard';
import { cities } from '../data/cities';
import { getDistance } from 'geolib';
import { toast } from 'react-toastify';
import InstructionsModal from './InstructionsModal';
const initialScore = 1500;

const Game: React.FC = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [userPinPosition, setUserPinPosition] = useState<[number, number] | null>(null);
  const [citiesFound, setCitiesFound] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  useEffect(() => {
    setCurrentCityIndex(Math.floor(Math.random() * cities.length));
  }, []);

  const handlePinMove = (position: [number, number]) => {
    setUserPinPosition(position);
    const distance = calculateDistance(position, cities[currentCityIndex].position);
    const newScore = score - distance;
    setScore(newScore);

    if (distance <= 50) {
      setCitiesFound(citiesFound + 1);
      toast.success(' Correct', {
        position: 'bottom-right' 
    });
      handleNextCity();
    }else {
      toast.info(`The distance to the correct city is ${distance.toFixed(2)} km`, {
        position: 'bottom-right'
      });
    }
  

    if (newScore <= 0) {
      endGame();
    }
    handleNextCity();
  };
 
  // Calculate distance between two positions
  const calculateDistance = (userPosition: [number, number], cityPosition: { lat: number, lng: number }): number => {
    return getDistance(
      { latitude: userPosition[0], longitude: userPosition[1] },
      { latitude: cityPosition.lat, longitude: cityPosition.lng }
    ) / 1000;
  };
 
   // End the game
  const endGame = () => {
    setGameOver(true);
  };
 
  // Move to the next city
  const handleNextCity = () => {
    if (currentCityIndex < cities.length - 1) {
      setCurrentCityIndex(currentCityIndex + 1);
    } else {
      setCurrentCityIndex(0);
    }
    setUserPinPosition(null);
  };
  
   // Reset the game
  const resetGame = () => {
    setScore(initialScore);
    setCitiesFound(0);
    setGameOver(false);
    setUserPinPosition(null);
    setCurrentCityIndex(Math.floor(Math.random() * cities.length));
  };
  const closeInstructions = () => {
    setShowInstructions(false); 
  };

  return (
    <div className='bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center'>
        {showInstructions && <InstructionsModal onClose={closeInstructions} />}
      <div className='bg-gray-800 p-8 rounded-lg shadow-md text-center mb-4'>
        {!gameOver ? (
          <>
            <CityCard cityName={cities[currentCityIndex].name} />
            <MapComponent onPinMove={handlePinMove} pinPosition={userPinPosition} />
            <div className='mt-4'>
              <p className='text-lg'>Score: {score.toFixed(2)}</p>
              <p className='text-lg'>Cities Found: {citiesFound}</p>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-2'>Game Over!</h2>
            <p className='text-lg mb-4'>High Score: {citiesFound}</p>
            <button
              onClick={resetGame}
              className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
