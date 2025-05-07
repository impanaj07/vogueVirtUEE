import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { FashionProvider } from './context/FashionContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import WardrobePage from './pages/WardrobePage';
import StyleProfile from './pages/StyleProfile';
import Footer from './components/Footer';
import BestOutfit from './pages/BestOutfit';
import SimilarOutfits from './pages/SimilarOutfits';
function App() {
  return (
    <Router>
      <UserProvider>
        <FashionProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route path='/best-outfit' element={<BestOutfit/>}/>
                <Route path='/similar-outfits' element={<SimilarOutfits/>}/>
                <Route path="/contact" element={<ContactUs />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/wardrobe" 
                  element={
                    <ProtectedRoute>
                      <WardrobePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/style-profile" 
                  element={
                    <ProtectedRoute>
                      <StyleProfile />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </FashionProvider>
      </UserProvider>
    </Router>
  );
}

export default App;