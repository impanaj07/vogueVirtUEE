import React, { useState, useRef } from 'react';
import { UploadCloud, X, Plus, ImageIcon } from 'lucide-react';

interface WardrobeUploaderProps {
  onUpload: (files: File[], metadata: ClothingMetadata[]) => void;
}

interface ClothingMetadata {
  name: string;
  category: string;
  color: string;
  brand?: string;
  season: string[];
}

type ClothingCategory = 
  | 'Tops' 
  | 'Bottoms' 
  | 'Dresses' 
  | 'Outerwear' 
  | 'Footwear' 
  | 'Accessories';

const CATEGORIES: ClothingCategory[] = [
  'Tops', 
  'Bottoms', 
  'Dresses', 
  'Outerwear', 
  'Footwear', 
  'Accessories'
];

const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];

const COLORS = [
  'Black', 'White', 'Gray', 'Red', 'Blue', 'Green', 
  'Yellow', 'Purple', 'Pink', 'Orange', 'Brown', 'Beige'
];

const WardrobeUploader: React.FC<WardrobeUploaderProps> = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [metadata, setMetadata] = useState<ClothingMetadata[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);
  const [dragActive, setDragActive] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      addNewFiles(files);
    }
  };
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files);
      addNewFiles(files);
    }
  };
  
  // Process and add new files
  const addNewFiles = (files: File[]) => {
    // Filter for image files
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;
    
    // Create new previews
    const newPreviews = imageFiles.map(file => URL.createObjectURL(file));
    
    // Create empty metadata for each file
    const newMetadata = imageFiles.map(() => ({
      name: '',
      category: 'Tops' as ClothingCategory,
      color: 'Black',
      season: ['Summer'],
    }));
    
    setSelectedFiles(prev => [...prev, ...imageFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    setMetadata(prev => [...prev, ...newMetadata]);
    
    // If this is the first file, open the details panel
    if (currentItemIndex === -1 && selectedFiles.length === 0) {
      setCurrentItemIndex(0);
    }
  };
  
  // Remove a file
  const removeFile = (index: number) => {
    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setMetadata(prev => prev.filter((_, i) => i !== index));
    
    // Adjust current item index
    if (currentItemIndex === index) {
      setCurrentItemIndex(selectedFiles.length > 1 ? 0 : -1);
    } else if (currentItemIndex > index) {
      setCurrentItemIndex(prev => prev - 1);
    }
  };
  
  // Update metadata for an item
  const updateMetadata = (index: number, field: keyof ClothingMetadata, value: string | string[]) => {
    setMetadata(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  
  // Toggle a season
  const toggleSeason = (index: number, season: string) => {
    setMetadata(prev => 
      prev.map((item, i) => {
        if (i === index) {
          const updatedSeasons = item.season.includes(season)
            ? item.season.filter(s => s !== season)
            : [...item.season, season];
          
          return { ...item, season: updatedSeasons };
        }
        return item;
      })
    );
  };
  
  // Handle final upload
  const handleUpload = () => {
    // Check if all required fields are filled
    const isComplete = metadata.every(item => 
      item.name.trim() !== '' && 
      item.category !== '' && 
      item.color !== '' &&
      item.season.length > 0
    );
    
    if (!isComplete) {
      alert('Please complete all required fields for each item');
      return;
    }
    
    onUpload(selectedFiles, metadata);
    
    // Reset form
    setSelectedFiles([]);
    setPreviews([]);
    setMetadata([]);
    setCurrentItemIndex(-1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add to Your Wardrobe</h2>
        
        {/* Upload area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
          } transition-colors cursor-pointer`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          
          <div className="flex flex-col items-center">
            <UploadCloud className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
        
        {/* Preview grid */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">
              Selected Items ({selectedFiles.length})
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {previews.map((preview, index) => (
                <div 
                  key={index}
                  className={`relative group rounded-md overflow-hidden border ${
                    currentItemIndex === index 
                      ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div 
                    className="w-full h-32 bg-gray-100 flex items-center justify-center overflow-hidden"
                    onClick={() => setCurrentItemIndex(index)}
                  >
                    <img 
                      src={preview} 
                      alt={`Item ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Filename label */}
                  <div className="p-2">
                    <p className="text-xs text-gray-700 truncate">
                      {metadata[index]?.name || selectedFiles[index].name}
                    </p>
                    {metadata[index]?.category && (
                      <p className="text-xs text-gray-500 truncate">
                        {metadata[index].category}
                      </p>
                    )}
                  </div>
                  
                  {/* Remove button */}
                  <button
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
              
              {/* Add more button */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center h-32 cursor-pointer hover:border-indigo-300 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center">
                  <Plus className="h-8 w-8 text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Add More</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Item Details Form */}
        {currentItemIndex >= 0 && selectedFiles.length > 0 && (
          <div className="mt-8 border rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Item Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Preview column */}
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[200px] h-64 bg-gray-100 rounded-md overflow-hidden mb-3">
                  {previews[currentItemIndex] ? (
                    <img 
                      src={previews[currentItemIndex]} 
                      alt="Selected item" 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between w-full max-w-[200px] text-sm">
                  <button 
                    disabled={currentItemIndex === 0}
                    onClick={() => setCurrentItemIndex(prev => prev - 1)}
                    className={`p-1 ${
                      currentItemIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <span className="text-gray-500">
                    {currentItemIndex + 1} / {selectedFiles.length}
                  </span>
                  
                  <button 
                    disabled={currentItemIndex === selectedFiles.length - 1}
                    onClick={() => setCurrentItemIndex(prev => prev + 1)}
                    className={`p-1 ${
                      currentItemIndex === selectedFiles.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-indigo-600'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
              
              {/* Form fields */}
              <div className="md:col-span-2 space-y-4">
                {/* Item Name */}
                <div>
                  <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name *
                  </label>
                  <input
                    id="item-name"
                    type="text"
                    value={metadata[currentItemIndex]?.name || ''}
                    onChange={(e) => updateMetadata(currentItemIndex, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g., Blue Oxford Shirt"
                  />
                </div>
                
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map(category => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => updateMetadata(currentItemIndex, 'category', category)}
                        className={`px-3 py-2 text-sm rounded-md ${
                          metadata[currentItemIndex]?.category === category
                            ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        } border`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color *
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {COLORS.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => updateMetadata(currentItemIndex, 'color', color)}
                        className={`px-3 py-2 text-xs rounded-md ${
                          metadata[currentItemIndex]?.color === color
                            ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        } border`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Season */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Season *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SEASONS.map(season => (
                      <button
                        key={season}
                        type="button"
                        onClick={() => toggleSeason(currentItemIndex, season)}
                        className={`px-3 py-2 text-sm rounded-md ${
                          metadata[currentItemIndex]?.season.includes(season)
                            ? 'bg-indigo-100 text-indigo-700 border-indigo-300'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        } border`}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Brand (optional) */}
                <div>
                  <label htmlFor="item-brand" className="block text-sm font-medium text-gray-700 mb-1">
                    Brand (optional)
                  </label>
                  <input
                    id="item-brand"
                    type="text"
                    value={metadata[currentItemIndex]?.brand || ''}
                    onChange={(e) => updateMetadata(currentItemIndex, 'brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g., Nike, Zara, etc."
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpload}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Add to Wardrobe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WardrobeUploader;