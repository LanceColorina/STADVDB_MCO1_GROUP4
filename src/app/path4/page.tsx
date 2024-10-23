"use client";
import { useState, useEffect } from "react";

interface Game {
  app_id: number;
  developers: string;
  publishers: string;
  windows_games: number;
  mac_games: number;
  linux_games: number;
}

export default function Path2() {

  const [games, setGames] = useState<Game[]>([]);
  const[devs, setDevelopers] = useState<string>("");
  const [pubs, setPublishers] = useState<string>("");
  const [windowsGames, setWindows] = useState<number | ''>('');
  const [macGames, setMac] = useState<number | ''>('');
  const [linuxGames, setLinux] = useState<number | ''>('');

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/path4?developers=${devs}&publishers=${pubs}&windows_games=${windowsGames}&mac_games=${macGames}&linux_games=${linuxGames}`);
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
  }, [setDevelopers, setPublishers, setWindows, setMac, setLinux]);

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
              <span className="font-medium">Developers:</span> {game.developers}
            </li>
            <li>
              <span className="font-medium">Publishers:</span> {game.publishers}
            </li>
            <li>
              <span className="font-medium">Windows Games:</span> {game.windows_games}
            </li>
            <li>
              <span className="font-medium">Mac Games:</span> {game.mac_games}
            </li>
            <li>
              <span className="font-medium">Linux Games:</span> {game.linux_games}
            </li>
          </ul>
        </div>
      ))}
    </div>
</div>
  );
}