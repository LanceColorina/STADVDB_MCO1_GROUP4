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
    <form onSubmit={onSubmit} className="mb-4 flex flex-col space-y-4">
      <div>
        <label>
          Windows:
          <input
            type="checkbox"
            checked={windows}
            onChange={(e) => setWindows(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div>
        <label>
          Mac:
          <input
            type="checkbox"
            checked={mac}
            onChange={(e) => setMac(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div>
        <label>
          Linux:
          <input
            type="checkbox"
            checked={linux}
            onChange={(e) => setLinux(e.target.checked)}
            className="ml-2"
          />
        </label>
      </div>
      <div>
        <label>
          Total Positive Reviews:
          <input
            type="number"
            value={total_positive_reviews}
            onChange={(e) => setPos(Number(e.target.value) || '')}
            className="ml-2 p-1 border border-gray-300 rounded"
          />
        </label>
      </div>
      <div>
        <label>
          Total Negative Reviews:
          <input
            type="number"
            value={total_negative_reviews}
            onChange={(e) => setNeg(Number(e.target.value) || '')}
            className="ml-2 p-1 border border-gray-300 rounded"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-white rounded shadow"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
