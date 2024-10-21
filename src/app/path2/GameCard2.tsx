import Link from "next/link"; 
import React from "react";

interface Game {
  app_id: number;
  game_name: string;
  header_image: string;
  website: string;
  total_positive_reviews: number;
  total_negative_reviews: number;
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {

  return (
    <div className="game-card bg-gray-800 p-4 rounded-lg shadow-md" key={game.app_id}>
      <img src={game.header_image} alt={game.game_name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">{game.game_name}</h3>
      <div className="text-gray-400 space-y-1">
        <p>Windows: <span className={`${game.windows ? 'text-green-500' : 'text-red-500'}`}>{game.windows === 'True' ? 'Yes' : 'No'}</span></p>
        <p>Mac: <span className={`${game.mac ? 'text-green-500' : 'text-red-500'}`}>{game.mac === 'True' ? 'Yes' : 'No'}</span></p>
        <p>Linux: <span className={`${game.linux ? 'text-green-500' : 'text-red-500'}`}>{game.linux === 'True' ? 'Yes' : 'No'}</span></p>
        <p>Positive Reviews: <span className="text-green-400">{game.total_positive_reviews}</span></p>
        <p>Negative Reviews: <span className="text-red-400">{game.total_negative_reviews}</span></p>
      </div>
    </div>
  );
};

export default GameCard;