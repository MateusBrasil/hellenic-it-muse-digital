import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';

const ExhibitsSoftware: React.FC = () => {
  const { currentVersion, translations } = useLanguage();
  const t = translations[currentVersion];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter transition-colors">
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
            src="/lovable-uploads/5490f128-819a-40bc-a7fd-6b0c15f83d85.png" 
            alt="Hellenic IT Museum Logo" 
            className="w-8 h-8"
          />
          <span className="font-semibold text-foreground">{t.siteName}</span>
        </div>
        <ThemeToggle />
      </div>
      <Navigation isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className="pt-20 transition-all duration-300">
        <section className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-4">Software Archive</h1>
          <img src="/img/placeholder.jpg" alt="Software Archive" className="w-full max-w-md mx-auto mb-6 rounded shadow" />
          <p className="mb-4">Dive into our archive of software, from operating systems to classic applications and games that powered generations of computers.</p>
        </section>
      </div>
    </div>
  );
};

export default ExhibitsSoftware; 