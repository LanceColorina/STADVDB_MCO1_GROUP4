"use client";
import { useState, useEffect } from "react";

interface Game {
  app_id: number;
  total_positive_reviews: number;
  total_negative_reviews: number;
  windows: string;
  mac: string;
  linux: string;
}

export default function Path2() {
  const [games, setGames] = useState<Game[]>([]);
  const [windowsPlatform, setWindows] = useState<boolean>(false); 
  const [macPlatform, setMac] = useState<boolean>(false);         
  const [linuxPlatform, setLinux] = useState<boolean>(false); // changed to boolean
  const [positiveReviews, setPos] = useState<number | ''>('');
  const [negativeReviews, setNeg] = useState<number | ''>('');

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/path2?windows=${windowsPlatform}&mac=${macPlatform}&linux=${linuxPlatform}&total_positive_reviews=${positiveReviews}&total_negative_reviews=${negativeReviews}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Game[] = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, [windowsPlatform, macPlatform, linuxPlatform, positiveReviews, negativeReviews]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <div className="game-card bg-gray-800 p-4 rounded" key={game.app_id}>
          <p>Windows: {game.windows}</p>
          <p>Mac: {game.mac}</p>
          <p>Linux: {game.linux}</p>
          <p>Positive Reviews: {game.total_positive_reviews}</p>
          <p>Negative Reviews: {game.total_negative_reviews}</p>
        </div>
      ))}
    </div>
  );
}
