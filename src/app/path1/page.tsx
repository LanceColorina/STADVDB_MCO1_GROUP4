"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

// Define the type for your game data (adjust fields as necessary)
interface Game {
  app_id: number;
}

export default function Path1() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("/api/path1");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Game[] = await response.json(); // Ensure the data is typed
        setGames(data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      Reporting 1 here
      {/* You can render your games here if needed */}
      <ul>
      {games.slice(0, 10).map((game) => (
            <div key={game.app_id}>{game.app_id} yes</div>
        ))}
      </ul>
    </div>
  );
}
