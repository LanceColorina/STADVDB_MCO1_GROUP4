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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map((game) => (
        <div className="game-card bg-gray-800 p-4 rounded" key={game.app_id}>
          <p>Developers:  {game.developers}</p>
          <p>Publishers {game.publishers}</p>
          <p>Windows Games: {game.windows_games}</p>
          <p>Mac Games: {game.mac_games}</p>
          <p>Linux Games: {game.linux_games}</p>
        </div>
      ))}
    </div>
  );
}