"use client";

import { useState } from "react";
import FilterForm from './FilterForm';
import GameCard from './GameCard';
import GameGraph from './GameGraph';

interface Game {
  game_name: string;
  price: number;
  average_playtime_forever: number;
  positive_feedback_percentage: number;
  total_feedback: number;
}

export default function Path1() {
  const [games, setGames] = useState<Game[]>([]);
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [minPlaytime, setMinPlaytime] = useState<number | ''>('');
  const [viewOption, setViewOption] = useState<string>('cards');
  const [showResults, setShowResults] = useState<boolean>(false);

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/path1?release_date=${releaseDate}&min_price=${minPrice}&max_price=${maxPrice}&average_playtime_forever=${minPlaytime}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setGames(data);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames();
  };

  const resetFilters = () => {
    setReleaseDate('');
    setMinPrice('');
    setMaxPrice('');
    setMinPlaytime('');
    setShowResults(false);
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
      <div className="mt-4 mb-6">
        <label className="text-white mr-4">Choose View:</label>
        <select 
          value={viewOption} 
          onChange={(e) => setViewOption(e.target.value)} 
          className="p-2 bg-gray-800 text-white rounded"
        >
          <option value="cards">Cards Only</option>
          <option value="price_chart">Price Bar Chart</option>
          <option value="playtime_chart">Average Playtime Bar Chart</option>
          <option value="feedback_chart">Positive Feedback Percentage Bar Chart</option>
          <option value="all_bar_charts">All Bar Charts</option>
        </select>
      </div>
      <button onClick={resetFilters} className="mb-4 p-2 bg-red-600 text-white rounded">
        Reset Filters
      </button>
      {showResults && viewOption === 'cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.slice(0, 10).map((game) => (
            <GameCard key={game.game_name} game={game} />
          ))}
        </div>
      )}
      {showResults && viewOption === 'price_chart' && (
        <GameGraph data={games} chartType="price" />
      )}
      {showResults && viewOption === 'playtime_chart' && (
        <GameGraph data={games} chartType="playtime" />
      )}
      {showResults && viewOption === 'feedback_chart' && (
        <GameGraph data={games} chartType="feedback" />
      )}
      {showResults && viewOption === 'all_bar_charts' && (
        <GameGraph data={games} chartType="all" />
      )}
    </div>
  );
}
