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
  const [showWindows, setShowWindows] = useState<boolean>(false);
  const [showMac, setShowMac] = useState<boolean>(false);
  const [showLinux, setShowLinux] = useState<boolean>(false);
  const [minWindows, setMinWindows] = useState<number | ''>('');
  const [maxWindows, setMaxWindows] = useState<number | ''>('');
  const [minMac, setMinMac] = useState<number | ''>('');
  const [maxMac, setMaxMac] = useState<number | ''>('');
  const [minLinux, setMinLinux] = useState<number | ''>('');
  const [maxLinux, setMaxLinux] = useState<number | ''>('');
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

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames();
  };
  
  useEffect(() => {
    fetchGames();
  }, [setDevelopers, setPublishers, setWindows, setMac, setLinux]);

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
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="mb-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-white mb-2">Platforms</label>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="text-white mr-2">Windows</label>
              <input
                type="checkbox"
                checked={showWindows}
                onChange={() => setShowWindows(!showWindows)}
              />
              {showWindows && (
                <div className="flex space-x-2 mt-2">
                  <input
                    type="number"
                    placeholder="Min Windows"
                    value={minWindows}
                    onChange={(e) => setMinWindows(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-20 p-2"
                  />
                  <input
                    type="number"
                    placeholder="Max Windows"
                    value={maxWindows}
                    onChange={(e) => setMaxWindows(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-20 p-2"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="text-white mr-2">Mac</label>
              <input
                type="checkbox"
                checked={showMac}
                onChange={() => setShowMac(!showMac)}
              />
              {showMac && (
                <div className="flex space-x-2 mt-2">
                  <input
                    type="number"
                    placeholder="Min Mac"
                    value={minMac}
                    onChange={(e) => setMinMac(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-20 p-2"
                  />
                  <input
                    type="number"
                    placeholder="Max Mac"
                    value={maxMac}
                    onChange={(e) => setMaxMac(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-20 p-2"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="text-white mr-2">Linux</label>
              <input
                type="checkbox"
                checked={showLinux}
                onChange={() => setShowLinux(!showLinux)}
              />
              {showLinux && (
                <div className="flex space-x-2 mt-2">
                  <input
                    type="number"
                    placeholder="Min Linux"
                    value={minLinux}
                    onChange={(e) => setMinLinux(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-20 p-2"
                  />
                  <input
                    type="number"
                    placeholder="Max Linux"
                    value={maxLinux}
                    onChange={(e) => setMaxLinux(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-20 p-2"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Filter Games
        </button>
      </form>

      {/* Display Filtered Games */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games
          .filter(filterGames) // Apply client-side filtering
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
