import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/contexts/ThemeContext';
import Navigation from '@/components/Navigation';

const DontMissThese = () => {
  const { translations, currentVersion } = useLanguage();
  const t = translations[currentVersion];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const featuredItems = [
    {
      title: "Apple Lisa Computer",
      description: "Rare Find",
      image: "/images/apple-lisa.jpg",
      longDescription: t.dontMissAppleLisa
    },
    {
      title: "UNIX Source Code",
      description: "Historical",
      image: "/images/unix-code.jpg",
      longDescription: t.dontMissUnix
    },
    {
      title: "Gaming Evolution",
      description: "Interactive",
      image: "/images/gaming.jpg",
      longDescription: t.dontMissGaming
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="relative flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <Button
              variant="ghost"
              className="mr-2 px-2 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={handleMenuToggle}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex flex-1 items-center justify-center lg:justify-center">
              <a href="/" className="flex items-center space-x-2">
                <img
                  src="/lovable-uploads/5490f128-819a-40bc-a7fd-6b0c15f83d85.png"
                  alt="Hellenic IT Museum"
                  className="h-8 w-8"
                />
                <span className="inline-block font-bold">{t.siteName}</span>
              </a>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </header>

        <Navigation isOpen={isMenuOpen} onToggle={handleMenuToggle} />

        <main className="flex-1">
          <div className="container py-8">
            <h1 className="text-4xl font-bold mb-8">Don't Miss These! ⭐</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.longDescription}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DontMissThese; 