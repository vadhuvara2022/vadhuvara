'use client';
import React, { useState } from 'react';
import Image from 'next/image';

interface Item {
  _id: string;
  name: string;
  gender: string;
  category: string;
  cost: number;
  description: string;
  sizes: string[];
  image: string;
}

const SearchComponent: React.FC = () => {
  const [searchId, setSearchId] = useState<string>('');
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setItem(null);

    try {
      const response = await fetch(`/api/main?id=${searchId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length > 0) {
        setItem(data[0]); // Assuming the item data is in the first element of the array
      } else {
        setError('No item found for the given ID');
      }
    } catch (error) {
      console.error('Error fetching item:', error);
      setError('Failed to fetch item');
    }
  };

  return (
    <div className="bg-gray-400 dark:bg-gray-800 h-screen w-screen flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit} className="max-w-[480px] w-full px-4 mb-8 mt-10 ">
        <div className="relative">
          <input
            type="text"
            name="searchId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
            placeholder="Enter ID"
          />
          <button type="submit" className="absolute top-3.5 right-3">
            <svg
              className="text-teal-400 h-5 w-5 fill-current dark:text-teal-300"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              
              xmlSpace="preserve"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {item && (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-[480px] w-full">
          <p className="text-lg font-semibold">Name: {item.name}</p>
          <p className="text-gray-700">Gender: {item.gender}</p>
          <p className="text-gray-700">Category: {item.category}</p>
          <p className="text-gray-700">Cost: ${item.cost}</p>
          <p className="text-gray-700">Description: {item.description}</p>
          <p className="text-gray-700">Sizes: {item.sizes.join(', ')}</p>
          {item.image && (
            <div className="mt-4">
              <Image src={item.image} alt="Fetched Image" width={300} height={600} className="max-w-full h-auto rounded-lg shadow-md" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;