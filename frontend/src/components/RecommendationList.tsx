import React, { useState, useEffect } from 'react';
import OutfitRecommendation from './OutfitRecommendation';
import { Sliders, Search } from 'lucide-react';

// Types
import { Outfit } from '../types/fashion';

interface RecommendationListProps {
  recommendations: Outfit[];
  title?: string;
}

const RecommendationList: React.FC<RecommendationListProps> = ({ 
  recommendations, 
  title = "Your Recommendations" 
}) => {
  const [filteredRecommendations, setFilteredRecommendations] = useState<Outfit[]>(recommendations);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    occasions: new Set<string>(),
    weather: new Set<string>(),
  });
  
  // Available filter options (dynamically generated from recommendations)
  const occasionOptions = [...new Set(recommendations.map(outfit => outfit.occasion))];
  const weatherOptions = [...new Set(recommendations.flatMap(outfit => outfit.weatherSuitable))];
  
  // Update filtered recommendations when filters or search change
  useEffect(() => {
    let filtered = [...recommendations];
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(outfit => 
        outfit.title.toLowerCase().includes(query) || 
        outfit.occasion.toLowerCase().includes(query) ||
        outfit.items.some(item => 
          item.name.toLowerCase().includes(query) || 
          item.category.toLowerCase().includes(query) ||
          (item.brand && item.brand.toLowerCase().includes(query))
        )
      );
    }
    
    // Apply occasion filters
    if (filters.occasions.size > 0) {
      filtered = filtered.filter(outfit => 
        filters.occasions.has(outfit.occasion)
      );
    }
    
    // Apply weather filters
    if (filters.weather.size > 0) {
      filtered = filtered.filter(outfit => 
        outfit.weatherSuitable.some(weather => filters.weather.has(weather))
      );
    }
    
    setFilteredRecommendations(filtered);
  }, [searchQuery, filters, recommendations]);
  
  // Toggle filter for a category
  const toggleFilter = (category: 'occasions' | 'weather', value: string) => {
    setFilters(prev => {
      const updated = new Set(prev[category]);
      if (updated.has(value)) {
        updated.delete(value);
      } else {
        updated.add(value);
      }
      return { ...prev, [category]: updated };
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      occasions: new Set<string>(),
      weather: new Set<string>(),
    });
    setSearchQuery('');
  };
  
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        
        <div className="flex items-center space-x-2 mt-3 md:mt-0">
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search outfits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          {/* Filter button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-1 py-2 px-3 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Sliders className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </div>
      
      {/* Filter panel */}
      {isFilterOpen && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Clear all
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Occasion filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Occasion</h4>
              <div className="flex flex-wrap gap-2">
                {occasionOptions.map(occasion => (
                  <button
                    key={occasion}
                    onClick={() => toggleFilter('occasions', occasion)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      filters.occasions.has(occasion)
                        ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                    } border`}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Weather filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Weather</h4>
              <div className="flex flex-wrap gap-2">
                {weatherOptions.map(weather => (
                  <button
                    key={weather}
                    onClick={() => toggleFilter('weather', weather)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      filters.weather.has(weather)
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                    } border`}
                  >
                    {weather}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredRecommendations.length} of {recommendations.length} outfits
      </p>
      
      {/* List of outfit recommendations */}
      {filteredRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map(outfit => (
            <OutfitRecommendation key={outfit.id} outfit={outfit} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-2">No outfits match your filters</p>
          <button
            onClick={clearFilters}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendationList;