import React from 'react';

interface CityCardProps {
  cityName: string;
}

const CityCard: React.FC<CityCardProps> = ({ cityName }) => {
  return (
    <div className="bg-gradient-to-r from-blue-400 mb-3 to-teal-400 text-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-2xl font-bold ">{cityName}</h2>
    </div>
  );
};

export default CityCard;
