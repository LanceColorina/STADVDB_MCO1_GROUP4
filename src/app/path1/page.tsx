// Path1.tsx
"use client";
import { useState, useEffect } from "react";
import FilterForm from './FilterForm';
import GameCard from './GameCard';

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

export default function Path1() {
  const [games, setGames] = useState<Game[]>([]);
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minPlaytime, setMinPlaytime] = useState<number | ''>('');

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/path1?release_date=${releaseDate}&min_price=${minPrice}&max_price=${maxPrice}&average_playtime_forever=${minPlaytime}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Game[] = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames();
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Game List</h1>
      <FilterForm
        releaseDate={releaseDate}
        minPrice={minPrice}
        maxPrice={maxPrice}
        minPlaytime={minPlaytime}
        setReleaseDate={setReleaseDate}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setMinPlaytime={setMinPlaytime}
        onSubmit={handleFilterSubmit}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.slice(0, 10).map((game) => (
          <GameCard key={game.app_id} game={game} />
        ))}
      </div>
    </div>
  );
}
