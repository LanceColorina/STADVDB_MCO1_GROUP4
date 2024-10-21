import Link from "next/link"; 
import React from "react";

interface Game {
  app_id: number;
  game_name: string;
  header_image: string;
  website: string;
  release_date: string;
  price: number;
  average_playtime_forever: number;
  positive: number;
  total_feedback: number;
  positive_feedback_percentage: number;
}

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {

  return (
    <div className="game-card bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" key={game.app_id}>
    <Link href={game.website} className="text-white">
      <img src={game.header_image} alt={game.game_name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{game.game_name}</h3>
        <p className="text-gray-400 mb-1">Release Date: <span className="text-white">{game.release_date}</span></p>
        <p className="text-gray-400 mb-1">Price: <span className="text-white">${game.price}</span></p>
        <p className="text-gray-400 mb-1">Average Playtime: <span className="text-white">{game.average_playtime_forever} mins</span></p>
        <p className="text-gray-400">Positive Feedback: <span className="text-green-400">{game.positive_feedback_percentage}%</span></p>
      </div>
    </Link>
  </div>

  );
};

export default GameCard;
