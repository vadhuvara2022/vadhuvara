"use client"
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

import Link from 'next/link';

interface Item {
  _id: string;
  name: string;
  category: string;
  gender: string;
  cost: number;
  description: string;
  sizes: string[];
  image: string;
}

const SliderCards: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/users?gender=men'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 p-3 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll mb-4 px-0.5 snap-x snap-mandatory scrollbar-hide"
      >
        <div className="flex gap-4">
          {items.map((card) => (
            <div key={card._id} className="flex-none w-64 snap-center">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
                <Link href={`/related/${card.category}/${card.name}`}>
                  <div className="relative w-full h-[250px] cursor-pointer">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-t-lg"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">{card.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {card.category}
                    {card.sizes.map((size) => (
                      <span key={size} className="inline-block ml-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                        {size}
                      </span>
                    ))}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-extrabold text-gray-900">₹{card.cost.toFixed(2)}</span>
                    <Link href={`/contactUs?id=${card._id}`}>
                    <button  className="ml-2 px-2 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 focus:outline-none">
                      Contact Us
                    </button>
                    </Link>
                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-3 bg-gray-700 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 focus:outline-none z-10"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default SliderCards;