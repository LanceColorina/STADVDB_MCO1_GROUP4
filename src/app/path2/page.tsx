// Path1.tsx
"use client";
import { useState, useEffect } from "react";
import FilterForm2 from './FilterForm2';
import GameCard2 from './GameCard2';


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

export default function Path2() {
  const [games, setGames] = useState<Game[]>([]);
  const [windowsPlatform, setWindows] = useState<boolean>(false); 
  const [macPlatform, setMac] = useState<boolean>(false);         
  const [linuxPlatform, setLinux] = useState<boolean>(false);
  const [postiveReviews, setPos] = useState<number | ''>('');
  const [negativeReviews, setNeg] = useState<number | ''>('');

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/path2?windows=${windowsPlatform}&mac=${macPlatform}&linux=${linuxPlatform}&total_positive_reviews=${postiveReviews}&total_negative_reviews=${negativeReviews}`);
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
      <FilterForm2
        windows = {windowsPlatform}
        mac = {macPlatform}
        linux = {linuxPlatform}
        total_positive_reviews = {postiveReviews}
        total_negative_reviews = {negativeReviews}
        setWindows={setWindows}
        setMac={setMac}
        setLinux={setLinux}
        setPos={setPos}
        setNeg={setNeg}
        onSubmit={handleFilterSubmit}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.slice(0, 10).map((game) => (
          <GameCard2 key={game.app_id} game={game} />
        ))}
      </div>
    </div>
  );
}
