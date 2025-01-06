// import React from 'react';
// import Link from 'next/link'
// interface ItemDetailProps {
//   item: {
//     _id: string;
//     name: string;
//     category: string;
//     cost: number;
//     description: string;
//     sizes: string[];
//   };
// }

// const ItemDetail: React.FC<ItemDetailProps> = ({ item }) => {
//   return (
//     <div className='p-4 md:ml-0 mx-auto max-w-lg md:max-w-none bg-white rounded-lg shadow-lg'> 
//       <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
//       <p className="text-sm text-gray-500 mt-2">{item.category}</p>
//       <p className="text-gray-600 mt-4">{item.description}</p>
//       <div className="mt-4">
//         {item.cost !== undefined ? (
//           <span className="text-2xl font-extrabold text-gray-900">₹{item.cost.toFixed(2)}</span>
//         ) : (
//           <span className="text-2xl font-extrabold text-gray-900">Cost not available</span>
//         )}
//       </div>
//       <div className="mt-4">
//         {item.sizes.map((size) => (
//           <span key={size} className="inline-block ml-1 mt-1 px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
//             {size}
//           </span>
//         ))}
//       </div>
//       <Link href={`/contactUs?id=${item._id}`}>
//       <button className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded hover:bg-blue-600 focus:outline-none">
//         Contact Us
//       </button>
//       </Link>
//     </div>
//   );
// };

// export default ItemDetail;

import React from 'react';
import Link from 'next/link';

interface ItemDetailProps {
  item: {
    _id: string;
    name: string;
    category: string;
    cost: number;
    description: string;
    sizes: string[];
  };
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item }) => {
  return (
    <div className="p-10">
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
          <div className="flex-1 px-6 py-8 lg:p-12 bg-gray-600">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">{item.name}</h3>
            <p className="mt-6 text-base text-gray-50 sm:text-lg">{item.description}</p>
            <div className="mt-8">
              <div className="flex items-center">
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>
              <ul role="list" className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">Category: {item.category}</p>
                </li>
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">Sizes: {item.sizes.join(', ')}</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-8 px-6 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 bg-gray-700">
            <p className="text-lg leading-6 font-medium text-white">Price</p>
            <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-white">
              <span>₹{item.cost.toFixed(2)}</span>
            </div>
            <div className="mt-6">
              <div className="rounded-md shadow">
                {/* <Link href={`/contactUs?id=${item._id}`}>
                  <a className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
                    Contact Us
                  </a>
                </Link> */}
                <Link href={`/contactUs?id=${item._id}`}>
      <button className="flex items-center justify-center ml-9 px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
        Contact Us
      </button>
       </Link>
              </div>
              <p className="text-gray-300 text-sm mt-3">100% satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
