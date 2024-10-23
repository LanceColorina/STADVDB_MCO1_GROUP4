"use client";

import { useState, useEffect } from "react";
import "./Filter.css";

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
  const [showWindows, setShowWindows] = useState<boolean>(false);
  const [showMac, setShowMac] = useState<boolean>(false);
  const [showLinux, setShowLinux] = useState<boolean>(false);
  const [minWindows, setMinWindows] = useState<number | ''>('');
  const [maxWindows, setMaxWindows] = useState<number | ''>('');
  const [minMac, setMinMac] = useState<number | ''>('');
  const [maxMac, setMaxMac] = useState<number | ''>('');
  const [minLinux, setMinLinux] = useState<number | ''>('');
  const [maxLinux, setMaxLinux] = useState<number | ''>('');

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

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames();
  };

  const filterGames = (game: Game) => {
    if (showWindows) {
      const minWin = minWindows !== '' ? minWindows : -Infinity;
      const maxWin = maxWindows !== '' ? maxWindows : Infinity;
      if (game.windows_games < minWin || game.windows_games > maxWin) {
        return false;
      }
    }

    if (showMac) {
      const minMacVal = minMac !== '' ? minMac : -Infinity;
      const maxMacVal = maxMac !== '' ? maxMac : Infinity;
      if (game.mac_games < minMacVal || game.mac_games > maxMacVal) {
        return false;
      }
    }

    if (showLinux) {
      const minLinuxVal = minLinux !== '' ? minLinux : -Infinity;
      const maxLinuxVal = maxLinux !== '' ? maxLinux : Infinity;
      if (game.linux_games < minLinuxVal || game.linux_games > maxLinuxVal) {
        return false;
      }
    }

    return true;
  };

  return (
    <div className="page-container">
      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <h2 className="filter-title">Filter Games by Platform</h2>
        <div className="filter-section">
          <label className="filter-label">Platforms</label>
          <div className="filter-options">
            <div>
              <label className="filter-checkbox-label">Windows</label>
              <input
                type="checkbox"
                checked={showWindows}
                onChange={() => setShowWindows(!showWindows)}
                className="filter-checkbox"
              />
              {showWindows && (
                <div className="filter-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minWindows}
                    onChange={(e) => setMinWindows(e.target.value === '' ? '' : Number(e.target.value))}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxWindows}
                    onChange={(e) => setMaxWindows(e.target.value === '' ? '' : Number(e.target.value))}
                    className="filter-input"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="filter-checkbox-label">Mac</label>
              <input
                type="checkbox"
                checked={showMac}
                onChange={() => setShowMac(!showMac)}
                className="filter-checkbox"
              />
              {showMac && (
                <div className="filter-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minMac}
                    onChange={(e) => setMinMac(e.target.value === '' ? '' : Number(e.target.value))}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxMac}
                    onChange={(e) => setMaxMac(e.target.value === '' ? '' : Number(e.target.value))}
                    className="filter-input"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="filter-checkbox-label">Linux</label>
              <input
                type="checkbox"
                checked={showLinux}
                onChange={() => setShowLinux(!showLinux)}
                className="filter-checkbox"
              />
              {showLinux && (
                <div className="filter-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minLinux}
                    onChange={(e) => setMinLinux(e.target.value === '' ? '' : Number(e.target.value))}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxLinux}
                    onChange={(e) => setMaxLinux(e.target.value === '' ? '' : Number(e.target.value))}
                    className="filter-input"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="filter-button">
          Filter Games
        </button>
      </form>
      {/* Display Filtered Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games
          .filter(filterGames)
          .map((game) => (
            <div className="game-card bg-gray-800 p-4 rounded" key={game.app_id}>
              <div className="text-white">
                <p>Developers: {game.developers}</p>
                <p>Publishers: {game.publishers}</p>
                {showWindows && game.windows_games > 0 && (
                  <p>Windows Games: {game.windows_games}</p>
                )}
                {showMac && game.mac_games > 0 && (
                  <p>Mac Games: {game.mac_games}</p>
                )}
                {showLinux && game.linux_games > 0 && (
                  <p>Linux Games: {game.linux_games}</p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
