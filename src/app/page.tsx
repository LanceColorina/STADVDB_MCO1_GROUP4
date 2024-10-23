"use client";
import Link from "next/link";
import { useState } from 'react'; // Import useState for managing component state

export default function Home() {
  const [showPrompt, setShowPrompt] = useState(false); // State to toggle the prompt visibility

  const togglePrompt = () => {
    setShowPrompt((prev) => !prev); // Toggle the visibility
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="text-white">
        <h1 className="text-blue-500 text-4xl font-bold text-center w-full">Steam</h1>
        <p className="text-gray-300 font-semibold text-xl mt-4">Welcome to the Steam platform</p>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-center text-white rounded w-full hover:bg-blue-600"
          onClick={togglePrompt} // Toggle prompt on button click
        >
          Explore Available Reports
        </button>

        {/* Hidden prompt with buttons */}
        {showPrompt && (
          <div className="mt-4 space-y-2">
            <Link href="/path1">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-2">
                Go to Path 1
              </button>
            </Link>
            <Link href="/path2">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-2">
                Go to Path 2
              </button>
            </Link>
            <Link href="/path3">
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-2">
                Go to Path 3
              </button>
            </Link>
            <Link href="/path4" >
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-2">
                Go to Path 4
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

