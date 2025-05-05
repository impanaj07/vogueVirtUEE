import React, { useState } from 'react';
import { useFashion } from '../context/FashionContext';
import WardrobeUploader from '../components/WardrobeUploader';
import { Plus, Trash2, Grid, List, Filter, Search } from 'lucide-react';

type ViewMode = 'grid' | 'list';
type ClothingCategory = 'All' | 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Footwear' | 'Accessories';

const WardrobePage: React.FC = () => {
  const { userWardrobe, addToWardrobe, removeFromWardrobe } = useFashion();
  
  const [isAddingItems, setIsAddingItems] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Filter items by category and search query
  const filteredItems = userWardrobe.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.color.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Handle upload
  const handleUpload = (files: File[], metadata: any[]) => {
    // In a real app, we would upload the files to storage and process them
    // For the demo, we'll create fake items with the metadata and URLs from the demo data
    
    const newItems = metadata.map((meta, index) => ({
      id: `item-${Date.now()}-${index}`,
      name: meta.name,
      category: meta.category,
      imageUrl: 'https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=600', // Placeholder image
      color: meta.color,
      brand: meta.brand,
      seasons: meta.season
    }));
    
    addToWardrobe(newItems);
    setIsAddingItems(false);
  };
  
  // Handle item delete
  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to remove this item from your wardrobe?')) {
      removeFromWardrobe(itemId);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wardrobe</h1>
        <p className="text-gray-600 mb-8">
          Manage your clothing items and accessories to get better recommendations.
        </p>
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <button
            onClick={() => setIsAddingItems(!isAddingItems)}
            className="flex items-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
          >
            {isAddingItems ? (
              "Cancel"
            ) : (
              <>
                <Plus className="w-5 h-5 mr-2" />
                Add Items
              </>
            )}
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm w-full md:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            {/* View toggle */}
            <div className="bg-white border border-gray-200 rounded-md p-1 flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${
                  viewMode === 'list' 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories'].map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as ClothingCategory)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-indigo-100 text-indigo-800 font-medium'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Add items form */}
        {isAddingItems && (
          <div className="mb-10">
            <WardrobeUploader onUpload={handleUpload} />
          </div>
        )}
        
        {/* Items display */}
        {userWardrobe.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your wardrobe is empty</h3>
            <p className="text-gray-600 mb-6">
              Add items to your wardrobe to get personalized outfit recommendations.
            </p>
            <button
              onClick={() => setIsAddingItems(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Item
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No items match your filters</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid view
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden relative group">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{item.name}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{item.category}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{item.color}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // List view
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <ul className="divide-y divide-gray-200">
              {filteredItems.map(item => (
                <li key={item.id} className="flex items-center p-4 hover:bg-gray-50">
                  <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden mr-4">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{item.color}</span>
                      {item.brand && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{item.brand}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WardrobePage;