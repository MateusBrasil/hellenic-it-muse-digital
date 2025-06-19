import React, { useState } from "react";
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';

const SupportDonate = () => {
  const { translations, currentVersion } = useLanguage();
  const t = translations[currentVersion].support.donate;
  const tGlobal = translations[currentVersion];
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
          <span className="font-semibold text-foreground">{tGlobal.siteName}</span>
        </div>
        <ThemeToggle />
      </div>
      <Navigation isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className="pt-20 transition-all duration-300">
        <div className="max-w-2xl mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
          <p className="text-lg text-foreground dark:text-foreground mb-8">{t.description}</p>
          <div className="bg-card dark:bg-card rounded-xl p-8 text-center text-muted-foreground dark:text-muted-foreground">
            {t.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportDonate; 