import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';

const permanentCollection = [
  {
    img: '/img/exhibit-computer.jpg',
    name: {
      en: 'Apple Lisa',
      gr: 'Apple Lisa',
      easy: 'Apple Lisa'
    },
    year: '1983',
    desc: {
      en: 'The revolutionary GUI pioneer from 1983.',
      gr: 'Ο επαναστατικός πρωτοπόρος GUI από το 1983.',
      easy: 'A very special old computer.'
    }
  },
  {
    img: '/img/exhibit-computer.jpg',
    name: {
      en: 'Commodore 64',
      gr: 'Commodore 64',
      easy: 'Commodore 64'
    },
    year: '1982',
    desc: {
      en: 'The best-selling computer of all time.',
      gr: 'Ο πιο εμπορικός υπολογιστής όλων των εποχών.',
      easy: 'A very popular old computer.'
    }
  },
  {
    img: '/img/exhibit-gaming.jpg',
    name: {
      en: 'Atari 2600',
      gr: 'Atari 2600',
      easy: 'Atari 2600'
    },
    year: '1977',
    desc: {
      en: 'The iconic home video game console.',
      gr: 'Η εμβληματική κονσόλα βιντεοπαιχνιδιών.',
      easy: 'A famous old game console.'
    }
  },
  // ...adicione mais exemplos reais do acervo
];

const ExhibitsPermanent: React.FC = () => {
  const { currentVersion, translations } = useLanguage();
  const t = translations[currentVersion];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter transition-colors">
      {/* Top Bar igual homepage */}
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
        <section className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-extrabold mb-4 text-primary drop-shadow-lg">
            {currentVersion === 'en' && 'Permanent Collection'}
            {currentVersion === 'gr' && 'Μόνιμη Συλλογή'}
            {currentVersion === 'easy' && 'Permanent Collection'}
          </h1>
          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
            {currentVersion === 'en' && "A selection of the most iconic and historically significant computers and devices from our museum's permanent collection. Explore the evolution of technology through real artifacts."}
            {currentVersion === 'gr' && 'Μια επιλογή από τους πιο εμβληματικούς και ιστορικά σημαντικούς υπολογιστές και συσκευές της μόνιμης συλλογής μας. Εξερευνήστε την εξέλιξη της τεχνολογίας μέσα από αυθεντικά εκθέματα.'}
            {currentVersion === 'easy' && 'See our most important old computers and devices!'}
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {permanentCollection.map((item, idx) => (
              <div
                className="group bg-card dark:bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col items-center border-2 border-transparent hover:border-primary"
                key={idx}
              >
                <img src={item.img} alt={item.name[currentVersion]} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-6 w-full flex-1 flex flex-col justify-between">
                  <h2 className="text-2xl font-bold mb-1 text-primary group-hover:text-primary transition-colors">
                    {item.name[currentVersion]}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">{item.year}</p>
                  <p className="mb-4 text-gray-700 dark:text-gray-300 text-center">{item.desc[currentVersion]}</p>
                </div>
              </div>
            ))}
          </div>
  </section>
      </div>
    </div>
);
};

export default ExhibitsPermanent; 