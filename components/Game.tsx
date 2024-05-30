'use client'
import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import CityCard from './CityCard';
import { cities } from '../data/cities';
import { getDistance } from 'geolib';

interface GameProps {
  initialScore: number;
}

const Game: React.FC<GameProps> = ({ initialScore }) => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [score, setScore] = useState(initialScore);
  const [userPinPosition, setUserPinPosition] = useState<[number, number] | null>(null);
  const [citiesFound, setCitiesFound] = useState(0); // Track the number of cities found

  useEffect(() => {
    setCurrentCityIndex(Math.floor(Math.random() * cities.length));
  }, []);

  const handlePinMove = (position: [number, number]) => {
    setUserPinPosition(position);
    const distance = calculateDistance(position, cities[currentCityIndex].position);
    setScore(score - distance);

    // Check if the distance is within 50km
    if (distance <= 50) {
      setCitiesFound(citiesFound + 1); // Increment cities found count
      // Additional logic for correct selection can go here
    }

    // Check if score reaches 0 to end the game
    if (score <= 0) {
      endGame();
    }
  };

  const calculateDistance = (userPosition: [number, number], cityPosition: { lat: number, lng: number }): number => {
    return getDistance(
      { latitude: userPosition[0], longitude: userPosition[1] },
      { latitude: cityPosition.lat, longitude: cityPosition.lng }
    ) / 1000; 
  };

  const endGame = () => {
  
    alert('Game over! High score:'+ citiesFound);
   
  };

  const handleNextCity = () => {
    if(currentCityIndex < cities.length-1)
      setCurrentCityIndex(currentCityIndex + 1);
    else
    setCurrentCityIndex(0);
    setUserPinPosition(null);
  };

  return (
    <div className='mx-auto py-10 px-24'>
      <div className='flex gap-10 '>

      <CityCard cityName={cities[currentCityIndex].name} onNextCity={handleNextCity} />
      <MapComponent onPinMove={handlePinMove} pinPosition={userPinPosition} />
      </div>
      <p>Score: {score.toFixed(2)}</p>
    </div>
  );
};

export default Game;
