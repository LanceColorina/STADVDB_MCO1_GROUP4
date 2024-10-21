import React from 'react';

interface FilterFormProps {
  releaseDate: string;
  minPrice: number | '';
  maxPrice: number | '';
  minPlaytime: number | '';
  setReleaseDate: (date: string) => void;
  setMinPrice: (price: number | '') => void;
  setMaxPrice: (price: number | '') => void;
  setMinPlaytime: (playtime: number | '') => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  releaseDate,
  minPrice,
  maxPrice,
  minPlaytime,
  setReleaseDate,
  setMinPrice,
  setMaxPrice,
  setMinPlaytime,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-4 flex flex-col space-y-4">
      <div>
        <label className='text-white font-bold'>
          Release Date:
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="ml-2 p-1 border text-black border-gray-300 rounded"
          />
        </label>
      </div>
      <div>
        <label className='text-white font-bold'>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
            className="ml-2 p-1 border text-black border-gray-300 rounded"
          />
        </label>
      </div>
      <div>
        <label className='text-white  font-bold'>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
            className="ml-2 p-1 border text-black border-gray-300 rounded"
          />
        </label>
      </div>
      <div>
        <label className='text-white font-bold'>
          Min Average Playtime:
          <input
            type="number"
            value={minPlaytime}
            onChange={(e) => setMinPlaytime(Number(e.target.value) || 0)}
            className="ml-2 p-1 border text-black border-gray-300 rounded"
          />
        </label>
      </div>
      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-black  rounded shadow"
      >
        Apply Filters
      </button>
    </form>
  );
};

export default FilterForm;
