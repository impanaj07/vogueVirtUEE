import React, { createContext, useState, useEffect, useContext } from 'react';

// Types
interface User {
  id: string;
  email: string;
  name?: string;
  preferences?: {
    stylePreferences: string[];
    favoriteColors: string[];
    dislikedItems: string[];
  };
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Mock users data (simulating a database)
const MOCK_USERS = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'password', // In a real app, this would be hashed
    name: 'Demo User',
    preferences: {
      stylePreferences: ['Casual', 'Minimalist'],
      favoriteColors: ['Black', 'White', 'Gray'],
      dislikedItems: ['Formal Shoes']
    }
  }
];

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for logged in user on initial load
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, this would verify JWT or session
      const storedUser = localStorage.getItem('styleai_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('styleai_user');
        }
      }
      setIsLoading(false);
    };
    
    // Simulate network delay
    setTimeout(checkAuth, 1000);
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find user
        const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          // Remove password before storing
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('styleai_user', JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };
  
  // Signup function
  const signup = async (email: string, password: string, name?: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = MOCK_USERS.some(u => u.email === email);
        
        if (userExists) {
          setIsLoading(false);
          reject(new Error('User with this email already exists'));
        } else {
          // Create new user (in a real app this would be saved to a database)
          const newUser = {
            id: Date.now().toString(),
            email,
            password,
            name,
            preferences: {
              stylePreferences: [],
              favoriteColors: [],
              dislikedItems: []
            }
          };
          
          MOCK_USERS.push(newUser);
          
          // Remove password before storing
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem('styleai_user', JSON.stringify(userWithoutPassword));
          setIsLoading(false);
          resolve();
        }
      }, 1000);
    });
  };
  
  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('styleai_user');
  };
  
  // Update user preferences
  const updateUserPreferences = (preferences: Partial<User['preferences']>): void => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('styleai_user', JSON.stringify(updatedUser));
    
    // In a real app, this would also update the database
  };
  
  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateUserPreferences
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};