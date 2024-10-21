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
    <div className="game-card" key={game.app_id}>
      
        <img src={game.header_image} alt={game.game_name} className="w-full h-auto" />
        <h3 className="text-lg font-bold">{game.game_name}</h3>
        <p>Windows: {game.windows}</p>
        <p>Mac: {game.mac}</p>
        <p>Linux: {game.linux}</p>
        <p>Positive Reviews: {game.total_positive_reviews}</p>
        <p>Negative Reviews: {game.total_negative_reviews}</p>
      
    </div>
  );
};

export default GameCard;