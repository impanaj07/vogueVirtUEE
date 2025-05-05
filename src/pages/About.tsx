import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles, Users, ShieldCheck, Zap, Database, Target, BarChart } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Fashion industry veteran with 10+ years experience in retail and e-commerce.'
    },
    {
      name: 'Sarah Chen',
      role: 'Chief AI Officer',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Former AI research lead with a PhD in machine learning and computer vision.'
    },
    {
      name: 'Marcus Williams',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Award-winning fashion designer bringing creative vision to our platform.'
    },
    {
      name: 'Priya Patel',
      role: 'Director of Engineering',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
      bio: 'Tech leader with experience building scalable solutions for fashion tech platforms.'
    }
  ];
  
  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About StyleAI</h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            We're on a mission to revolutionize personal style through the power of artificial intelligence.
          </p>
        </div>
      </section>
      
      {/* Our story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg">
              <p>
                StyleAI was founded in 2023 with a simple but ambitious goal: to make personal styling accessible to everyone. 
                We noticed that while fashion was becoming more democratic through e-commerce and social media, truly personalized 
                style advice remained a luxury reserved for the few.
              </p>
              <p>
                Our team of fashion experts, data scientists, and developers came together to build a solution that combines 
                the artistic sensibility of fashion with the analytical power of artificial intelligence. The result is StyleAI 
                - an intelligent fashion assistant that understands your personal style, preferences, and lifestyle.
              </p>
              <p>
                Today, we're proud to help thousands of people discover their unique style, make better use of their existing 
                wardrobe, and shop more intentionally. Our technology continues to evolve, learning from each interaction to 
                provide increasingly personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech and features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Technology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Behind StyleAI is a sophisticated system that combines computer vision, natural language processing, and 
            recommendation algorithms to understand fashion at a deep level.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Brain className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced AI</h3>
              <p className="text-gray-600">
                Our models are trained on millions of fashion images and expert recommendations to develop a deep understanding of style.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalization</h3>
              <p className="text-gray-600">
                StyleAI learns your preferences over time, adapting recommendations to your evolving taste and needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fashion Knowledge</h3>
              <p className="text-gray-600">
                Our system understands color theory, fabric properties, seasonal trends, and styling principles.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Get recommendations based on current weather, upcoming events, and the latest fashion trends.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Meet the passionate experts behind StyleAI who are combining fashion expertise with cutting-edge technology.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-medium text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center mb-12">
            The principles that guide everything we do at StyleAI.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-gray-800">
              <div className="bg-indigo-900/50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Users className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
              <p className="text-gray-300">
                We're committed to creating a platform that serves everyone, regardless of age, size, gender, or budget.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-gray-800">
              <div className="bg-indigo-900/50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy</h3>
              <p className="text-gray-300">
                Your data is always secure. We use it to improve your experience, never to invade your privacy.
              </p>
            </div>
            
            <div className="p-6 rounded-xl bg-gray-800">
              <div className="bg-indigo-900/50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-300">
                We're constantly exploring new ways to use technology to enhance personal style and expression.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Style?</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of users who have discovered their unique style with StyleAI.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-white text-indigo-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;