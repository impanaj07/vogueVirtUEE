// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// const BestOutfit: React.FC = () => {
//   const [images, setImages] = useState<File[]>([]);
//   const [generatedOutfit, setGeneratedOutfit] = useState<any>(null);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setImages(files);
//     }
//   };

//   const handleGenerateOutfit = () => {
//     setGeneratedOutfit({
//       top: images[0],
//       bottom: images[1],
//       footwear: images[2],
//     });
//   };
// const navigate = useNavigate();
//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 pb-12">
//       <div className="container mx-auto px-4">
//         {/* Header Section */}
//         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
//           <h1 className="text-3xl font-bold mb-2">Best Outfit Recommender</h1>
//           <p className="text-purple-100">Upload your clothes here and let us suggest the best outfit combinations.</p>
//         </div>

//         {/* Image Upload Section */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold mb-4">Upload Your Clothes</h2>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//             className="mb-4 p-2 border border-gray-300 rounded-lg"
//           />

//           {/* Display Uploaded Images */}
//           <div className="grid grid-cols-3 gap-4 mb-8">
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden flex justify-center items-center mx-auto"
//               >
//                 <img
//                   src={URL.createObjectURL(image)}
//                   alt={`uploaded-${index}`}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Generate Outfit Button */}
//           <button
//             onClick={handleGenerateOutfit}
//             className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Generate Outfit
//           </button>
//         </div>
      
//       {/* Find Similar Outfits Button */}
//       <button
//       onClick={() => {
//         navigate('/similar-outfits');}}
//       className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
//       >
//       Find Similar Outfits
//       </button>

//         {/* Display Generated Outfit */}
//         {generatedOutfit && (
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//             <h2 className="text-xl font-semibold mb-4">Generated Outfit</h2>
//             <div className="grid grid-cols-3 gap-4">
//               {['top', 'bottom', 'footwear'].map((item, index) => (
//                 <div key={index} className="text-center">
//                   <label className="block text-lg font-medium mb-2">
//                     {item.charAt(0).toUpperCase() + item.slice(1)}
//                   </label>
//                   <div className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden mx-auto">
//                     <img
//                       src={URL.createObjectURL(generatedOutfit[item])}
//                       alt={item}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BestOutfit;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BestOutfit: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [generatedOutfits, setGeneratedOutfits] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
    }
  };

  const handleGenerateOutfit = () => {
    if (images.length < 3) return;

    const outfitTemplate = {
      top: images[0],
      bottom: images[1],
      footwear: images[2],
    };

    const outfits = Array(4).fill(null).map(() => ({
      ...outfitTemplate,
    }));

    setGeneratedOutfits(outfits);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Best Outfit Recommender</h1>
          <p className="text-purple-100">Upload your clothes here and let us suggest the best outfit combinations.</p>
        </div>

        {/* Image Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Your Clothes</h2>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="mb-4 p-2 border border-gray-300 rounded-lg"
          />

          {/* Display Uploaded Images */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="w-32 h-32 border-2 border-gray-300 rounded-lg overflow-hidden flex justify-center items-center mx-auto"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploaded-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Generate Outfit Button */}
          <button
            onClick={handleGenerateOutfit}
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Generate Outfit
          </button>
        </div>

        {/* Find Similar Outfits Button */}
        <button
          onClick={() => navigate('/similar-outfits')}
          className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
        >
          Find Similar Outfits
        </button>

        {/* Display Generated Outfits */}
        {generatedOutfits.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Generated Outfits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {generatedOutfits.map((outfit, i) => (
                <div key={i} className="border p-4 rounded-lg shadow-md">
                  <h3 className="text-center text-lg font-bold mb-4">Outfit {i + 1}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['top', 'bottom', 'footwear'].map((part, index) => (
                      <div key={index} className="text-center">
                        <label className="block font-medium mb-1 capitalize">{part}</label>
                        <div className="w-24 h-24 mx-auto border rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(outfit[part])}
                            alt={part}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestOutfit;
