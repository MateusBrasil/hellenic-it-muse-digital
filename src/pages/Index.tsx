
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Navigation */}
      <Navigation isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="lg:ml-80 min-h-screen">
        
        {/* Top Bar for Mobile */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-100">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-museum-blue to-museum-blue-light rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">HIT</span>
              </div>
              <span className="font-semibold text-gray-900">Hellenic IT Museum</span>
            </div>
            
            <div className="w-10" />
          </div>
        </div>

        {/* Hero Section */}
        <div className="pt-16 lg:pt-0">
          <HeroSection />
        </div>

        {/* Featured Sections Preview */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Don't Miss Section Preview */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                  Don't Miss These! ⭐
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our most popular and remarkable exhibits that visitors absolutely love
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Apple Lisa Computer",
                    description: "The revolutionary GUI pioneer from 1983",
                    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop&q=80",
                    badge: "Rare Find"
                  },
                  {
                    title: "UNIX Source Code",
                    description: "Original Bell Labs documentation",
                    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop&q=80",
                    badge: "Historical"
                  },
                  {
                    title: "Gaming Evolution",
                    description: "From Pong to PlayStation",
                    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop&q=80",
                    badge: "Interactive"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="group bg-white rounded-2xl shadow-museum hover:shadow-museum-lg transition-all duration-300 overflow-hidden animate-scale-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-museum-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {item.badge}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-museum-blue transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Virtual Tour",
                  description: "Explore from home",
                  icon: "🎥",
                  color: "from-blue-500 to-purple-600"
                },
                {
                  title: "Buy Tickets",
                  description: "Skip the line",
                  icon: "🎫", 
                  color: "from-green-500 to-teal-600"
                },
                {
                  title: "Adopt Computer",
                  description: "Support heritage",
                  icon: "💻",
                  color: "from-orange-500 to-red-600"
                },
                {
                  title: "School Programs",
                  description: "Educational visits",
                  icon: "🎓",
                  color: "from-purple-500 to-pink-600"
                }
              ].map((action, index) => (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 shadow-museum hover:shadow-museum-lg transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className="text-3xl mb-3">{action.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
