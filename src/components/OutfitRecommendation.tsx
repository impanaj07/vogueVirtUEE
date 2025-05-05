import React, { useState } from 'react';
import { Heart, Share2, Download, ThumbsUp as Thumbs, ThumbsDown } from 'lucide-react';

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  brand?: string;
  color: string;
}

interface OutfitRecommendationProps {
  outfit: {
    id: string;
    title: string;
    occasion: string;
    items: ClothingItem[];
    weatherSuitable: string[];
  };
}

const OutfitRecommendation: React.FC<OutfitRecommendationProps> = ({ outfit }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  const toggleShare = () => {
    setIsShareOpen(!isShareOpen);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <h3 className="text-xl font-medium text-gray-900 mb-1">{outfit.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Perfect for: <span className="font-medium">{outfit.occasion}</span>
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          {outfit.items.map((item) => (
            <div key={item.id} className="rounded-md overflow-hidden bg-gray-50">
              <div className="h-40 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-2">
                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-1">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {outfit.weatherSuitable[0]}
            </span>
            {outfit.weatherSuitable.length > 1 && (
              <span className="text-xs text-gray-500">+{outfit.weatherSuitable.length - 1}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
              onClick={toggleSave}
              aria-label={isSaved ? "Unsave outfit" : "Save outfit"}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                onClick={toggleShare}
                aria-label="Share outfit"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              {isShareOpen && (
                <div className="absolute right-0 bottom-full mb-2 bg-white rounded-md shadow-lg p-2 w-36 z-10">
                  <div className="flex flex-col space-y-2">
                    <button className="flex items-center text-sm text-gray-700 hover:text-blue-500 px-2 py-1 rounded-md hover:bg-gray-50">
                      <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" className="w-5 h-5 mr-2" />
                      Instagram
                    </button>
                    <button className="flex items-center text-sm text-gray-700 hover:text-blue-500 px-2 py-1 rounded-md hover:bg-gray-50">
                      <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="Facebook" className="w-5 h-5 mr-2" />
                      Facebook
                    </button>
                    <button className="flex items-center text-sm text-gray-700 hover:text-blue-500 px-2 py-1 rounded-md hover:bg-gray-50">
                      <img src="https://cdn.simpleicons.org/pinterest/BD081C" alt="Pinterest" className="w-5 h-5 mr-2" />
                      Pinterest
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 border-t pt-3">
          <p className="text-sm text-gray-500">How's this outfit?</p>
          <div className="flex space-x-3">
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-green-500 transition-colors">
              <Thumbs className="w-5 h-5" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors">
              <ThumbsDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitRecommendation;