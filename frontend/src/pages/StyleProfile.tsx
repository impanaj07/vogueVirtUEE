import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Check, Save, Loader2 } from 'lucide-react';

interface StylePreference {
  id: string;
  label: string;
  description: string;
  imageUrl: string;
}

const STYLE_PREFERENCES: StylePreference[] = [
  {
    id: 'casual',
    label: 'Casual',
    description: 'Relaxed everyday outfits with comfort as priority',
    imageUrl: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'minimalist',
    label: 'Minimalist',
    description: 'Clean lines and neutral colors with less is more approach',
    imageUrl: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Professional attire for the workplace',
    imageUrl: 'https://images.pexels.com/photos/3760613/pexels-photo-3760613.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'streetwear',
    label: 'Streetwear',
    description: 'Urban, relaxed style with statement pieces',
    imageUrl: 'https://images.pexels.com/photos/7752820/pexels-photo-7752820.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'bohemian',
    label: 'Bohemian',
    description: 'Free-spirited style with patterns and textures',
    imageUrl: 'https://images.pexels.com/photos/5559986/pexels-photo-5559986.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'athleisure',
    label: 'Athleisure',
    description: 'Sporty and comfortable activewear for everyday',
    imageUrl: 'https://images.pexels.com/photos/4662950/pexels-photo-4662950.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'vintage',
    label: 'Vintage',
    description: 'Retro-inspired fashion from past decades',
    imageUrl: 'https://images.pexels.com/photos/6341518/pexels-photo-6341518.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'elegant',
    label: 'Elegant',
    description: 'Sophisticated and refined pieces with a timeless quality',
    imageUrl: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const COLORS = [
  { id: 'black', label: 'Black', hex: '#000000' },
  { id: 'white', label: 'White', hex: '#FFFFFF' },
  { id: 'gray', label: 'Gray', hex: '#808080' },
  { id: 'blue', label: 'Blue', hex: '#0000FF' },
  { id: 'navy', label: 'Navy', hex: '#000080' },
  { id: 'red', label: 'Red', hex: '#FF0000' },
  { id: 'green', label: 'Green', hex: '#008000' },
  { id: 'yellow', label: 'Yellow', hex: '#FFFF00' },
  { id: 'purple', label: 'Purple', hex: '#800080' },
  { id: 'pink', label: 'Pink', hex: '#FFC0CB' },
  { id: 'orange', label: 'Orange', hex: '#FFA500' },
  { id: 'brown', label: 'Brown', hex: '#A52A2A' },
  { id: 'beige', label: 'Beige', hex: '#F5F5DC' },
  { id: 'teal', label: 'Teal', hex: '#008080' },
  { id: 'maroon', label: 'Maroon', hex: '#800000' }
];

const OCCASIONS = [
  'Casual', 'Work', 'Formal', 'Evening', 'Party', 'Workout', 'Outdoor', 'Beach'
];

const StyleProfile: React.FC = () => {
  const { user, updateUserPreferences } = useUser();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [favoriteColors, setFavoriteColors] = useState<string[]>([]);
  const [dislikedColors, setDislikedColors] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Load existing preferences
  useEffect(() => {
    if (user?.preferences) {
      setSelectedStyles(user.preferences.stylePreferences || []);
      setFavoriteColors(user.preferences.favoriteColors || []);
      setDislikedColors(user.preferences.dislikedItems || []);
    }
  }, [user]);
  
  // Toggle style preference
  const toggleStylePreference = (styleId: string) => {
    setSelectedStyles(prev => {
      if (prev.includes(styleId)) {
        return prev.filter(id => id !== styleId);
      } else {
        return [...prev, styleId];
      }
    });
  };
  
  // Toggle color preference
  const toggleFavoriteColor = (colorId: string) => {
    setFavoriteColors(prev => {
      if (prev.includes(colorId)) {
        return prev.filter(id => id !== colorId);
      } else {
        // Remove from disliked if it's there
        setDislikedColors(disliked => disliked.filter(id => id !== colorId));
        return [...prev, colorId];
      }
    });
  };
  
  // Toggle disliked color
  const toggleDislikedColor = (colorId: string) => {
    setDislikedColors(prev => {
      if (prev.includes(colorId)) {
        return prev.filter(id => id !== colorId);
      } else {
        // Remove from favorites if it's there
        setFavoriteColors(fav => fav.filter(id => id !== colorId));
        return [...prev, colorId];
      }
    });
  };
  
  // Toggle occasion
  const toggleOccasion = (occasion: string) => {
    setOccasions(prev => {
      if (prev.includes(occasion)) {
        return prev.filter(o => o !== occasion);
      } else {
        return [...prev, occasion];
      }
    });
  };
  
  // Save preferences
  const savePreferences = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserPreferences({
        stylePreferences: selectedStyles,
        favoriteColors: favoriteColors,
        dislikedItems: dislikedColors
      });
      
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-white">
            <h1 className="text-2xl font-bold mb-2">Your Style Profile</h1>
            <p className="text-purple-100">
              Tell us about your style preferences to get better outfit recommendations.
            </p>
          </div>
          
          <div className="p-6">
            {/* Style preferences */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select your preferred styles</h2>
              <p className="text-gray-600 mb-6">
                Choose the styles that best represent your fashion taste. Select as many as you like.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {STYLE_PREFERENCES.map(style => (
                  <div 
                    key={style.id}
                    onClick={() => toggleStylePreference(style.id)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer group transition-transform hover:scale-105 transform ${
                      selectedStyles.includes(style.id) ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
                    }`}
                  >
                    <div className="aspect-w-4 aspect-h-3">
                      <img 
                        src={style.imageUrl} 
                        alt={style.label}
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-medium">{style.label}</h3>
                      <p className="text-xs text-gray-200 mt-1">{style.description}</p>
                    </div>
                    
                    {selectedStyles.includes(style.id) && (
                      <div className="absolute top-2 right-2 bg-indigo-500 text-white p-1 rounded-full">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            
            {/* Color preferences */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select your color preferences</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Favorite colors */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">Favorite Colors</h3>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map(color => (
                      <button
                        key={color.id}
                        onClick={() => toggleFavoriteColor(color.id)}
                        className={`w-10 h-10 rounded-full relative transition-transform hover:scale-110 ${
                          favoriteColors.includes(color.id) 
                            ? 'ring-2 ring-offset-2 ring-indigo-500 transform scale-110' 
                            : 'ring-1 ring-gray-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.label}
                      >
                        {favoriteColors.includes(color.id) && (
                          <Check className="absolute inset-0 m-auto text-white w-5 h-5 drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Disliked colors */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-4">Colors to Avoid</h3>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.map(color => (
                      <button
                        key={color.id}
                        onClick={() => toggleDislikedColor(color.id)}
                        className={`w-10 h-10 rounded-full relative transition-transform hover:scale-110 ${
                          dislikedColors.includes(color.id) 
                            ? 'ring-2 ring-offset-2 ring-red-500 transform scale-110' 
                            : 'ring-1 ring-gray-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.label}
                      >
                        {dislikedColors.includes(color.id) && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-0.5 bg-red-500 rotate-45 rounded-full"></div>
                            <div className="w-6 h-0.5 bg-red-500 -rotate-45 rounded-full absolute"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Occasions */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What occasions do you need outfits for?</h2>
              <div className="flex flex-wrap gap-3">
                {OCCASIONS.map(occasion => (
                  <button
                    key={occasion}
                    onClick={() => toggleOccasion(occasion)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      occasions.includes(occasion)
                        ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
                    } border`}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </section>
            
            {/* Save button */}
            <div className="flex items-center justify-end mt-8">
              {saveSuccess && (
                <span className="text-green-600 flex items-center mr-4">
                  <Check className="w-5 h-5 mr-1" />
                  Preferences saved!
                </span>
              )}
              <button
                onClick={savePreferences}
                disabled={isSaving}
                className="flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:bg-indigo-400"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleProfile;