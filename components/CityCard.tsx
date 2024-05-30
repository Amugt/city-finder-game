import React from 'react';

interface CityCardProps {
  cityName: string;
  onNextCity: () => void;
}

const CityCard: React.FC<CityCardProps> = ({ cityName, onNextCity }) => {
  return (
    <div className="city-card">
      <h2>{cityName}</h2>
      <button onClick={onNextCity}>Next City</button>
    </div>
  );
};

export default CityCard;
