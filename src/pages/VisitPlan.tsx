import React, { useState } from "react";
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';
import { Map, Bus, Car, Train } from 'lucide-react';

const VisitPlan = () => {
  const { translations, currentVersion } = useLanguage();
  const t = translations[currentVersion].visit.plan;
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
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Map className="w-8 h-8 text-primary mr-4" />
                <h2 className="text-2xl font-semibold">{t.locationTitle}</h2>
              </div>
              <p className="text-foreground dark:text-foreground mb-6">{t.address}</p>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.2744338664785!2d23.7518!3d37.9838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU5JzAxLjciTiAyM8KwNDUnMDYuNSJF!5e0!3m2!1sen!2sgr!4v1620000000000!5m2!1sen!2sgr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Bus className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-semibold">{t.busTitle}</h2>
                </div>
                <ul className="space-y-3 text-foreground dark:text-foreground">
                  {t.busLines.map((line, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Train className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-semibold">{t.metroTitle}</h2>
                </div>
                <ul className="space-y-3 text-foreground dark:text-foreground">
                  {t.metroLines.map((line, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <Car className="w-8 h-8 text-primary mr-4" />
                  <h2 className="text-2xl font-semibold">{t.parkingTitle}</h2>
                </div>
                <p className="text-foreground dark:text-foreground">{t.parkingDesc}</p>
              </div>
            </div>
          </div>

          <div className="bg-card dark:bg-card rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">{t.contactTitle}</h2>
            <p className="text-foreground dark:text-foreground mb-6">{t.contactDesc}</p>
            <Button className="bg-primary hover:bg-primary/90 text-black px-8 py-3 rounded-full">
              {t.contactButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitPlan; 