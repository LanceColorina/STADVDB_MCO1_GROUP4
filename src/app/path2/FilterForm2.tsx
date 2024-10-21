import React from 'react';

interface FilterFormProps {
  windows: boolean;
  mac: boolean;
  linux: boolean;
  total_positive_reviews: number | '';
  total_negative_reviews: number | '';
  setWindows: React.Dispatch<React.SetStateAction<boolean>>;
  setMac: React.Dispatch<React.SetStateAction<boolean>>;      
  setLinux: React.Dispatch<React.SetStateAction<boolean>>;
  setPos: React.Dispatch<React.SetStateAction<number | ''>>;
  setNeg: React.Dispatch<React.SetStateAction<number | ''>>; 
  onSubmit: (e: React.FormEvent) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  windows,
  mac,
  linux,
  total_positive_reviews,
  total_negative_reviews,
  setWindows,
  setMac,
  setLinux,
  setPos,
  setNeg,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-4 flex flex-col space-y-4 text-white font-medium max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
  <div className="flex items-center justify-between">
    <label className="flex items-center">
      <span className="mr-2">Windows:</span>
      <input
        type="checkbox"
        checked={windows}
        onChange={(e) => setWindows(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-500"
      />
    </label>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center">
      <span className="mr-2">Mac:</span>
      <input
        type="checkbox"
        checked={mac}
        onChange={(e) => setMac(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-500"
      />
    </label>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center">
      <span className="mr-2">Linux:</span>
      <input
        type="checkbox"
        checked={linux}
        onChange={(e) => setLinux(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-500"
      />
    </label>
  </div>

  <div className="flex flex-col">
    <label className="mb-1">Total Positive Reviews:</label>
    <input
      type="number"
      value={total_positive_reviews}
      onChange={(e) => setPos(Number(e.target.value) || '')}
      className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1">Total Negative Reviews:</label>
    <input
      type="number"
      value={total_negative_reviews}
      onChange={(e) => setNeg(Number(e.target.value) || '')}
      className="p-2 border border-gray-300 rounded bg-gray-700 text-white"
    />
  </div>

  <button
    type="submit"
    className="mt-4 p-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
  >
    Apply Filters
  </button>
</form>

  );
};

export default FilterForm;
