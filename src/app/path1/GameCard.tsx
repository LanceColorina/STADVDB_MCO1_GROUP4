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
  const formattedPrice = typeof game.price === 'number' ? game.price.toFixed(2) : 'N/A';

  return (
    <div className="game-card" key={game.app_id}>
      <Link href={game.website}>
        <img src={game.header_image} alt={game.game_name} className="w-full h-auto" />
        <h3 className="text-lg font-bold">{game.game_name}</h3>
        <p>Release Date: {game.release_date}</p>
        <p>Price: ${formattedPrice}</p>
        <p>Average Playtime: {game.average_playtime_forever} mins</p>
        <p>Positive Feedback: {game.positive_feedback_percentage}%</p>
      </Link>
    </div>
  );
};

export default GameCard;
