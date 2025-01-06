
// "use client"
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// // interface Item {
// //   _id: string;
// //   name: string;
// //   category: string;
// //   cost: number;
// //   description: string;
// //   sizes: string[];
// // }

// interface ImageData {
//   src: string;
// }

// interface RotatingCarouselProps {
//   images: ImageData[];
//   item:any;
// }

// const RotatingCarousel: React.FC<RotatingCarouselProps> = ({ images ,item}) => {
//   const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

//   useEffect(() => {
//     if (images && images.length > 0) {
//       setSelectedImage(images[0]); // Set the main image as the first image initially
//     }
//   }, [images]);

//   const handleThumbnailClick = (image: ImageData) => {
//     setSelectedImage(image);
//   };

//   if (!images || images.length === 0) {
//     return <div>No images available</div>;
//   }

//   if (!selectedImage) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className=" min-h-5 flex items-center justify-center   ">
//       <div className=" grid grid-cols-4 grid-rows-3 gap-4 max-w-5xl p-5 bg-gray-600 rounded-lg">
//         <div className="col-span-1 row-span-3 flex flex-col space-y-4 ">
//           {images.slice(0, 3).map((image, index) => (
//             <div key={index} className="border-4">
//               <Image src={image.src} alt={`Image ${index + 1}`} width={300} height={300} className=" object-cover cursor-pointer" onClick={() => handleThumbnailClick(image)} />
              
//             </div>         
//           ))}
         
//         </div>
//         <div className="col-span-2 row-span-2 ">
//           <Image src={selectedImage.src} alt="Main Image" width={600} height={300} objectFit="fit"  />
          
//         </div>
        
       
//         {images.length > 3 && (
//           <div className="col-span row-span-1 border-4">
//             <Image src={images[3].src} alt="Image 4" width={600} height={300}  objectFit="fit" className=" object-cover cursor-pointer" onClick={() => handleThumbnailClick(images[3])} />
//           </div>
//         )}
//         {images.length > 4 && (
//           <div className="col-span row-span-1 border-4">
//             <Image src={images[4].src} alt="Image 5" width={600} height={300}  objectFit="fit" className=" object-cover cursor-pointer" onClick={() => handleThumbnailClick(images[4])} />
//           </div>
//         )}
        
//         {/* <div className="col-span-3 text-center pt-5 border-4 border-solid p-5 bg-gray-100 ">
//           <h1 className="text-2xl font-bold text-brown-900">NEW COLLECTION</h1>
//           <p className="text-gray-700 mt-2">Discover our latest collection of fashion items. Each piece is crafted with care and attention to detail, ensuring you look your best.</p>
//           <a href="https://www.reallygreatsite.com" className="text-brown-900 text-lg block mt-4">www.reallygreatsite.com</a>
//           <Link href="/shop">
//             <button className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 focus:outline-none">Shop Now</button>
//           </Link>
//         </div>
//         */}
        
        
//       </div>
     
//     </div>
//   );
// };

// export default RotatingCarousel;
"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ImageData {
  src: string;
}



interface RotatingCarouselProps {
  images: ImageData[];
  
}

const RotatingCarousel: React.FC<RotatingCarouselProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]); // Set the main image as the first image initially
    }
  }, [images]);

  const handleThumbnailClick = (image: ImageData) => {
    setSelectedImage(image);
  };

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  if (!selectedImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brown-900">
      <div className="grid grid-cols-4 grid-rows-3 gap-4 max-w-5xl p-5 bg-gray-600 rounded-lg">
        <div className="col-span-1 row-span-3 flex flex-col space-y-4">
          {images.slice(0, 3).map((image, index) => (
            <div key={index} >
              <Image src={image.src} alt={`Image ${index + 1}`} width={300} height={300} className="object-cover cursor-pointer" onClick={() => handleThumbnailClick(image)} />
            </div>
          ))}
        </div>
        <div className="col-span-2 row-span-2">
          <Image src={selectedImage.src} alt="Main Image" width={600} height={300} objectFit="cover" />
        </div>
        {images.length > 3 && (
          <div className="col-span-1 row-span-1 ">
            <Image src={images[3].src} alt="Image 4" width={600} height={300} objectFit="cover" className="object-cover cursor-pointer" onClick={() => handleThumbnailClick(images[3])} />
          </div>
        )}
        {images.length > 4 && (
          <div className="col-span-1 row-span-1 ">
            <Image src={images[4].src} alt="Image 5" width={600} height={300} objectFit="cover" className="object-cover cursor-pointer" onClick={() => handleThumbnailClick(images[4])} />
          </div>
        )}
        
        <div className="col-span-4 md:col-span-3 text-center pt-5 border-4 border-pink-400 border-solid p-5 bg-gray-100">
          <h1 className="text-2xl font-bold text-brown-900">NEW COLLECTION</h1>
          <p className="text-gray-700 mt-2">Discover our latest collection of fashion items. Each piece is crafted with care and attention to detail, ensuring you look your best.</p>
          <a href="/www.fashiongallery.com" className="text-brown-900 text-lg block mt-4">www.fashiongallery.com</a>
          <Link className="mt-4 inline-block px-6 py-3 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 focus:outline-none" href="/shop">
            Vist Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RotatingCarousel;