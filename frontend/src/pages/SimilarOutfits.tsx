import React, { useState } from 'react';

const SimilarOutfits: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [similarImages, setSimilarImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setSimilarImages([]); // Reset previous results
    }
  };

  const handleGenerateSimilar = () => {
    // Simulate generating similar outfits — replace with your ML model output
    const dummySimilarImages = [
      '/similar1.jpg',
      '/similar2.jpg',
      '/similar3.jpg',
      '/similar4.jpg',
      '/similar5.jpg',
    ];
    setSimilarImages(dummySimilarImages);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Find Similar Outfits</h1>
          <p className="text-purple-100">Upload a clothing item to find similar styles using AI.</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload One Clothing Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4 p-2 border border-gray-300 rounded-lg"
          />

          {image && (
            <div className="flex justify-center mb-6">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="w-48 h-48 object-cover rounded-lg border-2 border-indigo-600"
              />
            </div>
          )}

          <button
            onClick={handleGenerateSimilar}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
          >
            Generate Similar Outfits
          </button>
        </div>

        {/* Result Section */}
        {similarImages.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Similar Outfits</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {similarImages.map((src, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    src={src}
                    alt={`similar-${index}`}
                    className="w-40 h-40 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarOutfits;
