"use client";

import Link from "next/link";
import { useState } from "react"; // Import useState for managing component state

export default function Path3() {
  interface Game {
    app_id: number;
    game_name: string;
    header_image: string;
    release_date: string;
    price: number;
    metacritic_score: number;
    website: string;
  }

  const [games, setGames] = useState<Game[]>([]);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | string>("");
  const [maxPrice, setMaxPrice] = useState<number | string>("");
  const [metacriticScore, setMetacriticScore] = useState<number | string>("");
  const [windows, setWindows] = useState<string>("True");
  const [mac, setMac] = useState<string>("True");
  const [linux, setLinux] = useState<string>("True");

  const fetchGames = async () => {
    try {
      const response = await fetch(
        `/api/path3?release_date=${releaseDate}&min_price=${minPrice}&max_price=${maxPrice}&metacritic_score=${metacriticScore}&windows=${windows}&linux=${linux}&mac=${mac}`
      );
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
      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="mb-8 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="releaseDate" className="block text-white mb-2">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="minPrice" className="block text-white mb-2">Min Price</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxPrice" className="block text-white mb-2">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="metacriticScore" className="block text-white mb-2">Metacritic Score</label>
          <input
            type="number"
            id="metacriticScore"
            value={metacriticScore}
            onChange={(e) => setMetacriticScore(e.target.value)}
            className="w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Platforms</label>
          <div className="flex space-x-4">
            <div>
              <label className="text-white mr-2">Windows</label>
              <input
                type="checkbox"
                checked={windows === "True"}
                onChange={() => setWindows(windows === "True" ? "False" : "True")}
              />
            </div>
            <div>
              <label className="text-white mr-2">Mac</label>
              <input
                type="checkbox"
                checked={mac === "True"}
                onChange={() => setMac(mac === "True" ? "False" : "True")}
              />
            </div>
            <div>
              <label className="text-white mr-2">Linux</label>
              <input
                type="checkbox"
                checked={linux === "True"}
                onChange={() => setLinux(linux === "True" ? "False" : "True")}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Filter Games
        </button>
      </form>

      {/* Display Filtered Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div className="game-card bg-gray-800 p-4 rounded" key={game.app_id}>
            <Link href={game.website || '/'} className="text-white">
              <img
                src={game.header_image}
                alt={game.game_name}
                className="w-full h-auto mb-2"
              />
              <h3 className="text-lg font-bold">{game.game_name}</h3>
              <p>Release Date: {game.release_date}</p>
              <p>Price: ${game.price}</p>
              <p>Metacritic Score: {game.metacritic_score}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}