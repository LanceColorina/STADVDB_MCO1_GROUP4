"use client";

import { useState } from "react";
import "./Filter.css";

interface Game {
  release_year: number;
  total_windows_games: number;
  total_mac_games: number;
  total_linux_games: number;
}

export default function Path4() {
  const [games, setGames] = useState<Game[]>([]);

  const fetchGames = async () => {
    try {
      const response = await fetch(`/api/path4`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Game[] = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  return (
    <div className="page-container">
      <button id="fetch-button" onClick={fetchGames} className="filter-button">
        Fetch Game Data
      </button>
      {games.length > 0 && (
        <div className="table-container">
          <h2 className="table-title">Total Games Released by Year</h2>
          <table className="game-table">
            <thead>
              <tr>
                <th>Release Year</th>
                <th>Total Windows Games</th>
                <th>Total Mac Games</th>
                <th>Total Linux Games</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.release_year}>
                  <td>{game.release_year}</td>
                  <td>{game.total_windows_games}</td>
                  <td>{game.total_mac_games}</td>
                  <td>{game.total_linux_games}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
