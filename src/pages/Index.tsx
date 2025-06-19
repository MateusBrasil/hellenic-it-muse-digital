import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import { Link } from 'react-router-dom';
import PacmanTimeline from '@/components/PacmanTimeline';

const quickActionLinks = [
  '/virtual-tour',
  '/tickets/individual',
  '/support/adopt',
  '/visit/schools',
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentVersion, translations } = useLanguage();
  const t = translations[currentVersion];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-inter transition-colors">
      {/* Top Bar sempre visível */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="text-foreground"
            >
              <Menu className="w-6 h-6" />
            </Button>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
              <img 
                src="/favicon.png" 
                alt="Hellenic IT Museum Logo" 
                className="w-8 h-8"
              />
              <span className="font-semibold text-foreground">{t.siteName}</span>
            </div>
            <ThemeToggle />
          </div>
      {/* Navigation Sidebar */}
      <Navigation isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      {/* Main Content */}
      <div className="pt-20 transition-all duration-300">
          <HeroSection />
        {/* Featured Sections Preview */}
        <section className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Timeline interativa estilo Pac-Man */}
            <div className="mb-20">
              <PacmanTimeline />
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
                  <Link
                    to={quickActionLinks[index]}
                    key={index}
                    className="group relative bg-card rounded-2xl p-6 shadow-museum hover:shadow-museum-lg transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className="text-3xl mb-3">{icons[index]}</div>
                      <h3 className="font-semibold text-card-foreground mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
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
