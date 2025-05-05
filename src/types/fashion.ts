// Types for the fashion recommendation system

// Clothing item
export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  color: string;
  brand?: string;
  seasons?: string[];
}

// Complete outfit
export interface Outfit {
  id: string;
  title: string;
  occasion: string;
  items: ClothingItem[];
  weatherSuitable: string[];
}

// AI-generated recommendation
export interface Recommendation {
  id: string;
  outfit: Outfit;
  confidence: number; // Percentage confidence in the recommendation
  createdAt: string;
}

// User style preferences
export interface StylePreferences {
  favoriteColors: string[];
  dislikedColors: string[];
  preferredStyles: string[];
  dislikedStyles: string[];
  occasions: string[]; // Work, Casual, Formal, Sport, etc.
}