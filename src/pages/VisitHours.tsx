import React, { useState } from "react";
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import { Clock, Calendar, Info } from 'lucide-react';

const VisitHours = () => {
  const { translations, currentVersion } = useLanguage();
  const t = translations[currentVersion].visit.hours;
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
        <div className="max-w-6xl mx-auto py-16 px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">{t.title}</h1>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-primary mr-4" />
                <h2 className="text-2xl font-semibold">{t.regularTitle}</h2>
              </div>
              <ul className="space-y-3 text-foreground dark:text-foreground">
                {t.regularHours.map((hour, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{hour.day}</span>
                    <span className="font-semibold">{hour.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 text-primary mr-4" />
                <h2 className="text-2xl font-semibold">{t.holidayTitle}</h2>
              </div>
              <ul className="space-y-3 text-foreground dark:text-foreground">
                {t.holidays.map((holiday, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {holiday}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Info className="w-8 h-8 text-primary mr-4" />
                <h2 className="text-2xl font-semibold">{t.noticeTitle}</h2>
              </div>
              <p className="text-foreground dark:text-foreground mb-6">{t.noticeDesc}</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-black">
                {t.contactButton}
              </Button>
            </div>
          </div>

          <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">{t.planTitle}</h2>
            <p className="text-foreground dark:text-foreground mb-6">{t.planDesc}</p>
            <Button className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full">
              {t.planButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitHours; 