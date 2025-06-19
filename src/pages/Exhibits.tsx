import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import Navigation from '@/components/Navigation';

const exhibitsData = [
  {
    category: 'computers',
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
    category: 'computers',
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
    category: 'videogames',
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
  {
    category: 'storage',
    img: '/img/exhibit-peripherals.jpg',
    name: {
      en: 'IBM 3420 Magnetic Tape',
      gr: 'IBM 3420 Μαγνητική Ταινία',
      easy: 'Old Tape Storage'
    },
    year: '1970',
    desc: {
      en: 'A classic magnetic tape storage unit.',
      gr: 'Κλασική μονάδα αποθήκευσης με μαγνητική ταινία.',
      easy: 'Old way to save data.'
    }
  },
  // ...adicione mais exemplos reais do acervo
];

const categories = [
  { key: 'all', en: 'All', gr: 'Όλα', easy: 'All' },
  { key: 'computers', en: 'Computers', gr: 'Υπολογιστές', easy: 'Computers' },
  { key: 'videogames', en: 'Videogames', gr: 'Βιντεοπαιχνίδια', easy: 'Games' },
  { key: 'storage', en: 'Storage Media', gr: 'Μέσα Αποθήκευσης', easy: 'How We Save Data' },
];

const Exhibits: React.FC = () => {
  const { currentVersion, translations } = useLanguage();
  const [selected, setSelected] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const tGlobal = translations ? translations[currentVersion] : {};
  const filtered = selected === 'all' ? exhibitsData : exhibitsData.filter(e => e.category === selected);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter transition-colors">
      <div className="fixed top-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
      <Navigation isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="pt-20 transition-all duration-300">
        <section className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-extrabold mb-4 text-primary drop-shadow-lg">
            {currentVersion === 'en' && 'Exhibits'}
            {currentVersion === 'gr' && 'Εκθέματα'}
            {currentVersion === 'easy' && 'Things to See'}
          </h1>
          <p className="mb-8 text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
            {currentVersion === 'en' && 'Explore our main categories of exhibits, from classic computers to rare peripherals and more.'}
            {currentVersion === 'gr' && 'Εξερευνήστε τις κύριες κατηγορίες εκθεμάτων μας, από κλασικούς υπολογιστές έως σπάνια περιφερειακά και άλλα.'}
            {currentVersion === 'easy' && 'See our computers, games and more!'}
          </p>
          <div className="flex gap-4 mb-10 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelected(cat.key)}
                className={`px-5 py-2 rounded-full font-semibold border-2 transition-all duration-200 ${selected === cat.key ? 'bg-primary text-black border-primary' : 'bg-card dark:bg-card text-primary border-primary/30 hover:bg-primary/10'}`}
              >
                {cat[currentVersion]}
              </button>
            ))}
          </div>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, idx) => (
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

export default Exhibits; 