import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const { translations, currentVersion } = useLanguage();
  const t = translations[currentVersion].hero;

  const handleWatchStory = () => {
    window.open('https://www.youtube.com/watch?v=dAZZsBtbUBU', '_blank');
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/80 to-muted overflow-hidden">
      {/* Background YouTube Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/dAZZsBtbUBU?autoplay=1&mute=1&controls=0&loop=1&playlist=dAZZsBtbUBU&modestbranding=1&showinfo=0&rel=0"
          title="YouTube video background"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start justify-center px-6 py-16">
        <h1 className="font-display font-extrabold leading-tight mb-6 text-4xl md:text-6xl lg:text-7xl drop-shadow-lg">
          <span className="text-primary">{t.title.split(' ')[0]}</span>{' '}
          {t.title.split(' ').slice(1).join(' ')}
            </h1>
        <p className="text-2xl lg:text-3xl font-medium text-primary mb-4 drop-shadow">
          {t.subtitle}
            </p>
        <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed drop-shadow">
          {t.description || ''}
            </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/visit">
              <Button 
                size="lg" 
                  className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 group"
              >
                  {t.visitToday}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-card text-foreground hover:bg-card/80 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300"
                onClick={handleWatchStory}
              >
                <Calendar className="w-5 h-5 mr-2" />
                {t.watchVideo}
              </Button>
            </div>
            {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
            <div className="text-3xl font-extrabold text-foreground mb-1 drop-shadow">{t.stats.artifacts}</div>
                <div className="text-sm text-gray-300">Artifacts</div>
              </div>
              <div className="text-center">
            <div className="text-3xl font-extrabold text-foreground mb-1 drop-shadow">{t.stats.years}</div>
                <div className="text-sm text-gray-300">Years Covered</div>
              </div>
              <div className="text-center">
            <div className="text-3xl font-extrabold text-foreground mb-1 drop-shadow">{t.stats.visitors}</div>
                <div className="text-sm text-gray-300">Annual Visitors</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
