import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Check, ShirtIcon, Palette, Cloud, Zap } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <p className="flex items-center text-violet-300 font-medium mb-4">
              <Sparkles className="w-5 h-5 mr-2" />
              AI-Powered Fashion Recommendations
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Elevate Your Style With AI Fashion Intelligence
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Upload your wardrobe and let our AI create stunning outfit recommendations tailored to your personal style, the occasion, and the weather.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/signup" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
              <Link 
                to="/about" 
                className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors border border-transparent hover:border-gray-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How StyleAI Works</h2>
            <p className="text-lg text-gray-600">
              Our AI-powered platform analyzes your wardrobe and preferences to create perfectly coordinated outfits for any occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-8 transition-transform hover:scale-105 duration-300">
              <div className="bg-indigo-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <ShirtIcon className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Upload Your Wardrobe</h3>
              <p className="text-gray-600 mb-4">
                Take photos of your clothing items or upload existing images to build your digital wardrobe.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Easy image upload</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Smart item categorization</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Color and pattern detection</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-8 transition-transform hover:scale-105 duration-300">
              <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Define Your Style</h3>
              <p className="text-gray-600 mb-4">
                Tell us about your style preferences, favorite colors, and the types of outfits you love.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Personalized style profile</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Color preference analysis</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Occasion-based preferences</span>
                </li>
              </ul>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-8 transition-transform hover:scale-105 duration-300">
              <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Get AI Recommendations</h3>
              <p className="text-gray-600 mb-4">
                Receive personalized outfit recommendations based on your wardrobe, style, and current weather.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Weather-appropriate suggestions</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Occasion-specific outfits</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Trending style integration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts who have transformed their style with StyleAI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/3754208/pexels-photo-3754208.jpeg?auto=compress&cs=tinysrgb&w=120"
                  alt="Sarah J."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah J.</h4>
                  <p className="text-gray-500 text-sm">Fashion Blogger</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "StyleAI has completely changed how I prepare for my shoots. The AI-generated outfit combinations are incredibly creative and on-trend!"
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=120"
                  alt="Michael T."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael T.</h4>
                  <p className="text-gray-500 text-sm">Tech Professional</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I used to struggle with putting together professional outfits. StyleAI now helps me look sharp for meetings with minimal effort!"
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120"
                  alt="Emma L."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Emma L.</h4>
                  <p className="text-gray-500 text-sm">College Student</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The weather-based recommendations are a game-changer! I never have to worry about being underdressed or overdressed for the conditions."
              </p>
              <div className="flex text-yellow-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Style?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their wardrobe with AI-powered fashion recommendations.
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-indigo-700 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Start Your Style Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;