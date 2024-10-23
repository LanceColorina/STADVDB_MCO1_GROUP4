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
        <p className="text-gray-300 text-center font-semibold text-xl mt-4">Welcome to the Steam platform</p>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-center text-white rounded w-full hover:bg-blue-600"
          onClick={togglePrompt} // Toggle prompt on button click
        >
          Explore Available Reports
        </button>

        {/* Hidden prompt with buttons */}
        {showPrompt && (
          <div className="mt-4 space-y-2 flex flex-col justify-center items-center">
            <Link href="/path1">
              <button className="w-[1100px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-2">
              The top 10 games based on playtime and positive feedback
              </button>
            </Link>
            <Link href="/path2">
              <button className=" w-[1100px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-2">
              The total number of positive and negative reviews for games available on different platform combinations (Windows, Mac, Linux)
              </button>
            </Link>
            <Link href="/path3">
              <button className="w-[1100px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-2">
              Games released after a certain date, with prices from A and B, have a metacritic score greater than C and are available on platform D,C,or E
              </button>
            </Link>
            <Link href="/path4" >
              <button className=" w-[1100px] px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 m-2">
              Games developed and published by each developer/publisher, categorized by their availability on Windows, Mac, and Linux platforms
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

