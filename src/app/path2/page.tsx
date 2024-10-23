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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {games.map((game) => (
        <div
          className="game-card bg-gray-900 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          key={game.app_id}
        >
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-medium">Windows:</span> {game.windows}
            </li>
            <li>
              <span className="font-medium">Mac:</span> {game.mac}
            </li>
            <li>
              <span className="font-medium">Linux:</span> {game.linux}
            </li>
            <li>
              <span className="font-medium">Positive Reviews:</span> {game.total_positive_reviews}
            </li>
            <li>
              <span className="font-medium">Negative Reviews:</span> {game.total_negative_reviews}
            </li>
          </ul>
        </div>
      ))}
    </div>
</div>
  );
}
