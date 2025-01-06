"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Item {
  _id: string;
  name: string;
  category: string;
  gender: string;
  cost: number;
  description: string;
  sizes: string[];
  image: string;
  totalImages: { src: string; alt: string }[];
}

const CategoryPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const category = params?.category;
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (category) {
      const fetchItems = async () => {
        try {
          const response = await fetch(`/api/main?category=${category}`);
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
    }
  }, [category]);

  const handleImageClick = (item: Item) => {
    router.push(`/related/${category}/${item.name}/${item._id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Category: {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 cursor-pointer" onClick={() => handleImageClick(item)}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: 'contain' }}
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg leading-6 font-bold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {item.category}
                {item.sizes.map((size) => (
                  <span key={size} className="inline-block ml-1 mt-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                    {size}
                  </span>
                ))}
              </p>
              <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-extrabold text-gray-900">₹{item.cost.toFixed(2)}</span>
                <button className="ml-2 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 focus:outline-none">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;