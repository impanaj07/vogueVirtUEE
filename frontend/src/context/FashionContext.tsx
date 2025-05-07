import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';
import type { Outfit, ClothingItem, Recommendation } from '../types/fashion';

interface FashionContextType {
  userWardrobe: ClothingItem[];
  recommendations: Recommendation[];
  savedOutfits: Outfit[];
  isLoading: boolean;
  addToWardrobe: (items: ClothingItem[]) => void;
  removeFromWardrobe: (itemId: string) => void;
  saveOutfit: (outfit: Outfit) => void;
  removeSavedOutfit: (outfitId: string) => void;
  generateRecommendations: (occasion?: string, weather?: string) => void;
}

const FashionContext = createContext<FashionContextType | undefined>(undefined);

export const useFashion = (): FashionContextType => {
  const context = useContext(FashionContext);
  if (context === undefined) {
    throw new Error('useFashion must be used within a FashionProvider');
  }
  return context;
};

// Mock clothing items for demo
const DEMO_WARDROBE_ITEMS: ClothingItem[] = [
  {
    id: 'item1',
    name: 'White T-Shirt',
    category: 'Tops',
    imageUrl: 'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'White',
    seasons: ['Spring', 'Summer'],
    brand: 'Basic Co.'
  },
  {
    id: 'item2',
    name: 'Blue Jeans',
    category: 'Bottoms',
    imageUrl: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Blue',
    seasons: ['Spring', 'Fall', 'Winter'],
    brand: 'Denim Pro'
  },
  {
    id: 'item3',
    name: 'Black Jacket',
    category: 'Outerwear',
    imageUrl: 'https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Black',
    seasons: ['Fall', 'Winter'],
  },
  {
    id: 'item4',
    name: 'Sneakers',
    category: 'Footwear',
    imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'White',
    seasons: ['Spring', 'Summer', 'Fall'],
    brand: 'SportStep'
  },
  {
    id: 'item5',
    name: 'Black Dress',
    category: 'Dresses',
    imageUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Black',
    seasons: ['Spring', 'Summer', 'Fall'],
    brand: 'Elegance'
  },
  {
    id: 'item6',
    name: 'Beige Sweater',
    category: 'Tops',
    imageUrl: 'https://images.pexels.com/photos/12116517/pexels-photo-12116517.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Beige',
    seasons: ['Fall', 'Winter'],
  }
];

// Mock outfit recommendations
const DEMO_OUTFITS: Outfit[] = [
  {
    id: 'outfit1',
    title: 'Classic Casual',
    occasion: 'Casual',
    items: [
      {
        id: 'item1',
        name: 'White T-Shirt',
        category: 'Tops',
        imageUrl: 'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'White',
      },
      {
        id: 'item2',
        name: 'Blue Jeans',
        category: 'Bottoms',
        imageUrl: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'Blue',
      },
      {
        id: 'item4',
        name: 'Sneakers',
        category: 'Footwear',
        imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'White',
      }
    ],
    weatherSuitable: ['Sunny', 'Mild']
  },
  {
    id: 'outfit2',
    title: 'Evening Ready',
    occasion: 'Evening',
    items: [
      {
        id: 'item5',
        name: 'Black Dress',
        category: 'Dresses',
        imageUrl: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'Black',
      },
      {
        id: 'item7',
        name: 'Black Heels',
        category: 'Footwear',
        imageUrl: 'https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'Black',
      }
    ],
    weatherSuitable: ['Mild', 'Warm']
  },
  {
    id: 'outfit3',
    title: 'Cozy Winter',
    occasion: 'Casual',
    items: [
      {
        id: 'item6',
        name: 'Beige Sweater',
        category: 'Tops',
        imageUrl: 'https://images.pexels.com/photos/12116517/pexels-photo-12116517.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'Beige',
      },
      {
        id: 'item2',
        name: 'Blue Jeans',
        category: 'Bottoms',
        imageUrl: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'Blue',
      },
      {
        id: 'item3',
        name: 'Black Jacket',
        category: 'Outerwear',
        imageUrl: 'https://images.pexels.com/photos/2853909/pexels-photo-2853909.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'Black',
      }
    ],
    weatherSuitable: ['Cold', 'Snowy']
  },
  {
    id: 'outfit4',
    title: 'Business Casual',
    occasion: 'Work',
    items: [
      {
        id: 'item8',
        name: 'White Button-up Shirt',
        category: 'Tops',
        imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'White',
      },
      {
        id: 'item9',
        name: 'Black Slacks',
        category: 'Bottoms',
        imageUrl: 'https://images.pexels.com/photos/8386188/pexels-photo-8386188.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'Black',
      },
      {
        id: 'item10',
        name: 'Leather Loafers',
        category: 'Footwear',
        imageUrl: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600',
        color: 'Brown',
      }
    ],
    weatherSuitable: ['Mild', 'Sunny']
  }
];

// Provider component
export const FashionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [userWardrobe, setUserWardrobe] = useState<ClothingItem[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize with demo data or load from localStorage
  useEffect(() => {
    const loadFashionData = () => {
      if (user) {
        // In a real app, this would fetch data from a server for the logged in user
        try {
          // Attempt to load from localStorage first (simulating persistence)
          const storedWardrobe = localStorage.getItem(`${user.id}_wardrobe`);
          const storedOutfits = localStorage.getItem(`${user.id}_saved_outfits`);
          
          if (storedWardrobe) {
            setUserWardrobe(JSON.parse(storedWardrobe));
          } else {
            // Use demo data for new users
            setUserWardrobe(DEMO_WARDROBE_ITEMS);
            localStorage.setItem(`${user.id}_wardrobe`, JSON.stringify(DEMO_WARDROBE_ITEMS));
          }
          
          if (storedOutfits) {
            setSavedOutfits(JSON.parse(storedOutfits));
          }
          
          // Generate initial recommendations
          generateRecommendationsInternal();
        } catch (error) {
          console.error('Error loading fashion data:', error);
          // Fallback to demo data
          setUserWardrobe(DEMO_WARDROBE_ITEMS);
        }
      } else {
        // Clear data when no user is logged in
        setUserWardrobe([]);
        setRecommendations([]);
        setSavedOutfits([]);
      }
      
      setIsLoading(false);
    };
    
    // Simulate network delay
    setTimeout(loadFashionData, 1000);
  }, [user]);
  
  // Internal function to generate recommendations based on wardrobe items
  const generateRecommendationsInternal = (occasion?: string, weather?: string) => {
    setIsLoading(true);
    
    // Simulate AI recommendation generation
    setTimeout(() => {
      // Filter outfits based on occasion and weather if provided
      let filteredOutfits = [...DEMO_OUTFITS];
      
      if (occasion) {
        filteredOutfits = filteredOutfits.filter(outfit => 
          outfit.occasion.toLowerCase() === occasion.toLowerCase()
        );
      }
      
      if (weather) {
        filteredOutfits = filteredOutfits.filter(outfit => 
          outfit.weatherSuitable.some(w => 
            w.toLowerCase() === weather.toLowerCase()
          )
        );
      }
      
      // Create recommendation objects
      const newRecommendations = filteredOutfits.map(outfit => ({
        id: `rec_${outfit.id}`,
        outfit: outfit,
        confidence: Math.floor(Math.random() * 30) + 70, // Random confidence between 70-99%
        createdAt: new Date().toISOString()
      }));
      
      setRecommendations(newRecommendations);
      setIsLoading(false);
    }, 1500);
  };
  
  // Add items to wardrobe
  const addToWardrobe = (items: ClothingItem[]) => {
    if (!user) return;
    
    const newWardrobe = [...userWardrobe, ...items];
    setUserWardrobe(newWardrobe);
    
    // Save to localStorage (simulating database persistence)
    localStorage.setItem(`${user.id}_wardrobe`, JSON.stringify(newWardrobe));
    
    // Generate new recommendations based on updated wardrobe
    generateRecommendationsInternal();
  };
  
  // Remove item from wardrobe
  const removeFromWardrobe = (itemId: string) => {
    if (!user) return;
    
    const newWardrobe = userWardrobe.filter(item => item.id !== itemId);
    setUserWardrobe(newWardrobe);
    
    // Save to localStorage
    localStorage.setItem(`${user.id}_wardrobe`, JSON.stringify(newWardrobe));
  };
  
  // Save outfit
  const saveOutfit = (outfit: Outfit) => {
    if (!user) return;
    
    // Check if already saved
    if (!savedOutfits.some(saved => saved.id === outfit.id)) {
      const newSavedOutfits = [...savedOutfits, outfit];
      setSavedOutfits(newSavedOutfits);
      
      // Save to localStorage
      localStorage.setItem(`${user.id}_saved_outfits`, JSON.stringify(newSavedOutfits));
    }
  };
  
  // Remove saved outfit
  const removeSavedOutfit = (outfitId: string) => {
    if (!user) return;
    
    const newSavedOutfits = savedOutfits.filter(outfit => outfit.id !== outfitId);
    setSavedOutfits(newSavedOutfits);
    
    // Save to localStorage
    localStorage.setItem(`${user.id}_saved_outfits`, JSON.stringify(newSavedOutfits));
  };
  
  // Public function to generate new recommendations
  const generateRecommendations = (occasion?: string, weather?: string) => {
    generateRecommendationsInternal(occasion, weather);
  };
  
  const value = {
    userWardrobe,
    recommendations,
    savedOutfits,
    isLoading,
    addToWardrobe,
    removeFromWardrobe,
    saveOutfit,
    removeSavedOutfit,
    generateRecommendations
  };
  
  return <FashionContext.Provider value={value}>{children}</FashionContext.Provider>;
};