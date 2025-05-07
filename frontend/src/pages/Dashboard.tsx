import React, { useState, useEffect } from 'react';
import { useFashion } from '../context/FashionContext';
import { useUser } from '../context/UserContext';
import RecommendationList from '../components/RecommendationList';
import { Sun, Cloud, CloudRain, Snowflake, Wind, Calendar, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import vogue from '../assets/vogue.jpeg'; // adjust path as needed
const Dashboard: React.FC = () => {
  const { user } = useUser();
  const { recommendations, savedOutfits, generateRecommendations, isLoading } = useFashion();
  
  const [activeTab, setActiveTab] = useState<'recommendations' | 'saved'>('recommendations');
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedWeather, setSelectedWeather] = useState<string | null>(null);
  
  // Generate initial recommendations
  useEffect(() => {
    if (recommendations.length === 0 && !isLoading) {
      generateRecommendations();
    }
  }, [recommendations, isLoading, generateRecommendations]);
  
  // Handle occasion filter
  const handleOccasionFilter = (occasion: string) => {
    if (selectedOccasion === occasion) {
      setSelectedOccasion(null);
    } else {
      setSelectedOccasion(occasion);
    }
    generateRecommendations(occasion === selectedOccasion ? undefined : occasion, selectedWeather || undefined);
  };
  
  // Handle weather filter
  const handleWeatherFilter = (weather: string) => {
    if (selectedWeather === weather) {
      setSelectedWeather(null);
    } else {
      setSelectedWeather(weather);
    }
    generateRecommendations(selectedOccasion || undefined, weather === selectedWeather ? undefined : weather);
  };
  const navigate = useNavigate();
  return (
   <div className="min-h-screen bg-gray-50 pt-24 pb-12">
  
      <div className="container mx-auto px-4">
        {/* Welcome section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Welcome back, {user?.name || 'Fashion Enthusiast'}!
              </h1>
              <p className="text-purple-100">
                Here are your personalized outfit recommendations for today.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="flex items-center bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors">
                <Settings className="w-5 h-5 mr-2" />
                Customize Preferences
              </button>
            </div>
          </div>
        </div>
         {/* Poster section */}
<div
  className="relative h-64 mb-8 rounded-xl overflow-hidden shadow-lg"
  style={{
    backgroundImage: `url(${vogue})`, // Replace with actual image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-purple-800/70 to-indigo-800/70 flex items-center justify-center text-center">
    <div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md">
        Find Your Perfect Look
      </h2>
      <button
        onClick={() => navigate('/best-outfit')}
        className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-2 rounded-lg border border-white backdrop-blur transition-colors"
      >
        Best Outfit Recommender
      </button>
    </div>
  </div>
</div>
        {/* Filters and tabs */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Filter toggles */}
            <div className="flex flex-wrap gap-3">
              <h3 className="font-medium text-gray-700 mr-2 flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                Occasion:
              </h3>
              {['Casual', 'Work', 'Evening', 'Formal'].map(occasion => (
                <button
                  key={occasion}
                  onClick={() => handleOccasionFilter(occasion)}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedOccasion === occasion
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                  } border transition-colors`}
                >
                  {occasion}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <h3 className="font-medium text-gray-700 mr-2 flex items-center">
                Weather:
              </h3>
              <button
                onClick={() => handleWeatherFilter('Sunny')}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
                  selectedWeather === 'Sunny'
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                } border transition-colors`}
              >
                <Sun className="w-4 h-4 mr-1" />
                Sunny
              </button>
              <button
                onClick={() => handleWeatherFilter('Mild')}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
                  selectedWeather === 'Mild'
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                } border transition-colors`}
              >
                <Cloud className="w-4 h-4 mr-1" />
                Mild
              </button>
              <button
                onClick={() => handleWeatherFilter('Rainy')}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
                  selectedWeather === 'Rainy'
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                } border transition-colors`}
              >
                <CloudRain className="w-4 h-4 mr-1" />
                Rainy
              </button>
              <button
                onClick={() => handleWeatherFilter('Cold')}
                className={`px-3 py-1.5 rounded-full text-sm flex items-center ${
                  selectedWeather === 'Cold'
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                } border transition-colors`}
              >
                <Snowflake className="w-4 h-4 mr-1" />
                Cold
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mt-8 border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'recommendations'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } mr-8 transition-colors`}
                onClick={() => setActiveTab('recommendations')}
              >
                AI Recommendations
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } transition-colors`}
                onClick={() => setActiveTab('saved')}
              >
                Saved Outfits {savedOutfits.length > 0 && `(${savedOutfits.length})`}
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="mt-8">
          {activeTab === 'recommendations' && (
            isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <RecommendationList 
                recommendations={recommendations.map(rec => rec.outfit)} 
                title="Your AI-Powered Style Recommendations"
              />
            )
          )}
          
          {activeTab === 'saved' && (
            savedOutfits.length > 0 ? (
              <RecommendationList 
                recommendations={savedOutfits} 
                title="Your Saved Outfits"
              />
            ) : (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No saved outfits yet</h3>
                <p className="text-gray-600 mb-6">
                  When you find an outfit you love, save it to access it later.
                </p>
                <button
                  onClick={() => setActiveTab('recommendations')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Explore Recommendations
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
