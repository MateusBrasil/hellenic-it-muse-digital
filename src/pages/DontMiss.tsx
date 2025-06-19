import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DontMiss = () => {
  const { currentVersion, translations } = useLanguage();
  const t = translations[currentVersion];

  return (
    <div className="min-h-screen bg-background text-foreground font-inter transition-colors pt-20">
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
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
                className="group bg-card rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden animate-scale-in"
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
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-card-foreground text-lg mb-2 group-hover:text-primary transition-colors">
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
      </section>
    </div>
  );
};

export default DontMiss; 