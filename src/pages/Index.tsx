
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentVersion, translations } = useLanguage();
  const t = translations[currentVersion];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter transition-colors">
      {/* Navigation */}
      <Navigation isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="lg:ml-80 min-h-screen">
        
        {/* Top Bar for Mobile */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="text-foreground"
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/5490f128-819a-40bc-a7fd-6b0c15f83d85.png" 
                alt="Hellenic IT Museum Logo" 
                className="w-8 h-8"
              />
              <span className="font-semibold text-foreground">{t.siteName}</span>
            </div>
            
            <ThemeToggle />
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
                <h2 className={`font-display font-bold text-foreground mb-4 ${
                  currentVersion === 'easy' ? 'text-3xl lg:text-4xl' : 'text-4xl lg:text-5xl'
                }`}>
                  {t.dontMiss.title}
                </h2>
                <p className={`text-muted-foreground max-w-3xl mx-auto ${
                  currentVersion === 'easy' ? 'text-lg' : 'text-xl'
                }`}>
                  {t.dontMiss.subtitle}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.dontMiss.items.map((item: any, index: number) => (
                  <div 
                    key={index}
                    className="group bg-card rounded-2xl shadow-museum hover:shadow-museum-lg transition-all duration-300 overflow-hidden animate-scale-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="relative">
                      <img 
                        src={
                          index === 0 ? "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop&q=80" :
                          index === 1 ? "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop&q=80" :
                          "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop&q=80"
                        }
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
                      <h3 className="font-semibold text-card-foreground text-lg mb-2 group-hover:text-museum-blue transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.quickActions.map((action: any, index: number) => {
                const icons = ["🎥", "🎫", "💻", "🎓"];
                const colors = [
                  "from-blue-500 to-purple-600",
                  "from-green-500 to-teal-600", 
                  "from-orange-500 to-red-600",
                  "from-purple-500 to-pink-600"
                ];
                
                return (
                  <div 
                    key={index}
                    className="group relative bg-card rounded-2xl p-6 shadow-museum hover:shadow-museum-lg transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className="text-3xl mb-3">{icons[index]}</div>
                      <h3 className="font-semibold text-card-foreground mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
