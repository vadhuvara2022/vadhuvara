"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ItemDetail from '@/components/ItemDetail';
import RotatingCarousel from '@/components/RotatingCarousel';

interface Item {
  _id: string;
  name: string;
  category: string;
  cost: number;
  description: string;
  sizes: string[];
  totalImages: { src: string }[];
}


const ItemDetailPage: React.FC = () => {
  const params = useParams();
  const category = params?.category;
  const name = params?.name;
  const id = params?.id;
  const [item, setItem] = useState<Item | null>(null);
  

  useEffect(() => {
    if (category && name && id) {
      const fetchItem = async () => {
        try {
          const response = await fetch(`/api/main?category=${category}&name=${name}&id=${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          setItem(data[0]); 
         
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };

      fetchItem();
    }
  }, [category, name, id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div >
        <div className="mb-6  ">
          {item.totalImages && item.totalImages.length > 0 ? (
            <RotatingCarousel images={item.totalImages}  />
          ) : (
            <div>No images available</div>
          )}
        </div>
       
          <ItemDetail item={item} />
        
      </div>
    </div>
  );
};

export default ItemDetailPage;