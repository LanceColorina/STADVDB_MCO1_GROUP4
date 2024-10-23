import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GameGraphProps {
  data: {
    game_name: string;
    price: number;
    average_playtime_forever: number;
    positive_feedback_percentage: number;
    total_feedback: number;
  }[];
  chartType: 'price' | 'playtime' | 'feedback' | 'all'; 
}

const GameGraph: React.FC<GameGraphProps> = ({ data, chartType }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {chartType === 'price' && (
        <div className="bar-chart" style={{ height: '500px' }}>
          <h2 className="text-white font-bold mb-4">Game Prices (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={500} minWidth={800}>
            <BarChart data={data} margin={{ bottom: 80 }}>
              <XAxis dataKey="game_name" tick={false} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#8884d8" name="Price" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartType === 'playtime' && (
        <div className="bar-chart" style={{ height: '500px' }}>
          <h2 className="text-white font-bold mb-4">Average Playtime (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={500} minWidth={800}>
            <BarChart data={data} margin={{ bottom: 80 }}>
              <XAxis dataKey="game_name" tick={false} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="average_playtime_forever" fill="#82ca9d" name="Avg Playtime" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartType === 'feedback' && (
        <div className="bar-chart" style={{ height: '500px' }}>
          <h2 className="text-white font-bold mb-4">Positive Feedback Percentage (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={500} minWidth={800}>
            <BarChart data={data} margin={{ bottom: 80 }}>
              <XAxis dataKey="game_name" tick={false} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="positive_feedback_percentage" fill="#ffc658" name="Positive Feedback %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartType === 'all' && (
        <>
          <div className="bar-chart" style={{ height: '500px' }}>
            <h2 className="text-white font-bold mb-4">Game Prices (Bar Chart)</h2>
            <ResponsiveContainer width="100%" height={500} minWidth={800}>
              <BarChart data={data} margin={{ bottom: 80 }}>
                <XAxis dataKey="game_name" tick={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#8884d8" name="Price" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bar-chart" style={{ height: '500px' }}>
            <h2 className="text-white font-bold mb-4">Average Playtime (Bar Chart)</h2>
            <ResponsiveContainer width="100%" height={500} minWidth={800}>
              <BarChart data={data} margin={{ bottom: 80 }}>
                <XAxis dataKey="game_name" tick={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average_playtime_forever" fill="#82ca9d" name="Avg Playtime" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bar-chart" style={{ height: '500px' }}>
            <h2 className="text-white font-bold mb-4">Positive Feedback Percentage (Bar Chart)</h2>
            <ResponsiveContainer width="100%" height={500} minWidth={800}>
              <BarChart data={data} margin={{ bottom: 80 }}>
                <XAxis dataKey="game_name" tick={false} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="positive_feedback_percentage" fill="#ffc658" name="Positive Feedback %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default GameGraph;
