import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Home, Calendar, Camera, Settings, Users, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, LanguageVersion } from '@/contexts/LanguageContext';

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onToggle }) => {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [submenuVisible, setSubmenuVisible] = useState<string | null>(null);
  const submenuTimeout = useRef<NodeJS.Timeout | null>(null);
  const { currentVersion, setCurrentVersion, translations } = useLanguage();
  const t = translations[currentVersion];

  const toggleSubmenu = (menuId: string) => {
    if (window.innerWidth < 1024) {
      setSubmenuVisible(submenuVisible === menuId ? null : menuId);
    }
  };

  const handleMenuMouseEnter = (menuId: string) => {
    if (window.innerWidth >= 1024) {
      if (submenuTimeout.current) clearTimeout(submenuTimeout.current);
      setHoveredMenu(menuId);
      setSubmenuVisible(menuId);
    }
  };

  const handleMenuMouseLeave = (menuId: string) => {
    if (window.innerWidth >= 1024) {
      submenuTimeout.current = setTimeout(() => {
        setHoveredMenu(null);
        setSubmenuVisible(null);
      }, 120);
    }
  };

  const handleLanguageChange = (version: LanguageVersion) => {
    setCurrentVersion(version);
    console.log('Language changed to:', version);
  };

  const navigationItems = [
    {
      id: 'home',
      title: t.navigation.home,
      icon: Home,
      href: '/',
      submenu: [
        { title: "Don't Miss These! ⭐", href: '/dont-miss-these', special: true }
      ]
    },
    {
      id: 'exhibits',
      title: t.navigation.exhibits,
      icon: Camera,
      submenu: [
        { title: 'Permanent Collection', href: '/exhibits/permanent' },
        { title: 'Temporary Exhibitions', href: '/exhibits/temporary' },
        { title: 'Computer Gallery', href: '/exhibits/computers' },
        { title: 'Software Archive', href: '/exhibits/software' },
        { title: 'Gaming History', href: '/exhibits/gaming' }
      ]
    },
    {
      id: 'visit',
      title: t.navigation.visit,
      icon: MapPin,
      submenu: [
        { title: 'Plan Your Visit', href: '/visit' },
        { title: 'Opening Hours', href: '/visit/hours' },
        { title: 'Admission Prices', href: '/visit/prices' },
        { title: 'Accessibility', href: '/visit/accessibility' },
        { title: 'Group Visits', href: '/visit/groups' },
        { title: 'School Programs', href: '/visit/schools' }
      ]
    },
    {
      id: 'tickets',
      title: t.navigation.tickets,
      icon: Calendar,
      submenu: [
        { title: 'Buy Individual Tickets', href: '/tickets/individual' },
        { title: 'Group Bookings', href: '/tickets/groups' },
        { title: 'School Programs', href: '/tickets/schools' },
        { title: 'More.com Integration', href: '/tickets/more-com' }
      ]
    },
    {
      id: 'activities',
      title: t.navigation.activities,
      icon: Users,
      submenu: [
        { title: 'Educational Programs', href: '/activities/education' },
        { title: 'Workshops', href: '/activities/workshops' },
        { title: 'Events Calendar', href: '/activities/events' },
        { title: 'Summer Camps', href: '/activities/camps' },
        { title: 'Adult Learning', href: '/activities/adult' }
      ]
    },
    {
      id: 'virtual-tour',
      title: t.navigation.virtualTour,
      icon: Camera,
      href: '/virtual-tour',
      special: true
    },
    {
      id: 'support',
      title: t.navigation.support,
      icon: Settings,
      submenu: [
        { title: 'Adopt a Computer', href: '/support/adopt', special: true },
        { title: 'Become a Friend', href: '/support/friends' },
        { title: 'Corporate Partnerships', href: '/support/corporate' },
        { title: 'Volunteer', href: '/support/volunteer' },
        { title: 'Donations', href: '/support/donate' }
      ]
    }
  ];

  const getLanguageButtonStyle = (version: LanguageVersion) => {
    return currentVersion === version
      ? "flex-1 py-2 px-3 text-xs font-medium bg-primary text-black rounded-md transition-colors"
      : "flex-1 py-2 px-3 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors";
  };

  return (
    <>
      {/* Backdrop para fechar o menu ao clicar fora */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" 
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white/95 dark:bg-background/95 backdrop-blur-xl shadow-lg transform transition-transform duration-300 ease-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center space-x-3">
            <img 
              src="/favicon.png" 
              alt="Hellenic IT Museum Logo" 
              className="w-10 h-10 rounded-xl"
            />
            <div>
              <h1 className="font-display font-bold text-gray-900 dark:text-white text-lg leading-tight">
                {t.siteName}
              </h1>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground">{t.tagline}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="lg:hidden"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Language Selector */}
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex space-x-2">
            <button 
              onClick={() => handleLanguageChange('en')}
              className={getLanguageButtonStyle('en')}
            >
              <img src="https://flagcdn.com/us.svg" alt="US" className="inline w-5 h-5 mr-1 rounded-sm align-text-bottom" /> EN
            </button>
            <button 
              onClick={() => handleLanguageChange('gr')}
              className={getLanguageButtonStyle('gr')}
            >
              <img src="https://flagcdn.com/gr.svg" alt="GR" className="inline w-5 h-5 mr-1 rounded-sm align-text-bottom" /> GR
            </button>
            <button 
              onClick={() => handleLanguageChange('easy')}
              className={getLanguageButtonStyle('easy')}
            >
              🔵 Easy
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 relative">
          <ul className="space-y-2 relative z-10">
            {navigationItems.map((item) => (
              <li key={item.id}
                onMouseEnter={() => handleMenuMouseEnter(item.id)}
                onMouseLeave={() => handleMenuMouseLeave(item.id)}
              >
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group relative ${
                        (submenuVisible === item.id)
                          ? 'bg-black text-white dark:bg-zinc-800 dark:text-white'
                          : 'hover:bg-black hover:text-white dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-200'
                      }`}
                      tabIndex={0}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {(submenuVisible === item.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {/* Subcategorias por hover */}
                    {(submenuVisible === item.id) && (
                      <ul
                        className="mt-2 ml-8 space-y-1 animate-fade-in"
                        onMouseEnter={() => handleMenuMouseEnter(item.id)}
                        onMouseLeave={() => handleMenuMouseLeave(item.id)}
                      >
                        {item.submenu.map((subItem, index) => (
                          <li key={index}>
                            <a
                              href={subItem.href}
                              className={`block p-2 rounded-lg text-sm transition-colors hover:bg-black dark:hover:bg-zinc-800 ${
                                subItem.special 
                                  ? 'text-black dark:text-white font-medium' 
                                  : 'text-gray-600 dark:text-zinc-300 hover:text-white dark:hover:text-white'
                              }`}
                            >
                              {subItem.special && '⭐ '}
                              {subItem.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                      hoveredMenu === item.id
                        ? 'bg-black text-white shadow-museum dark:bg-zinc-800'
                        : 'hover:bg-black hover:text-white dark:hover:bg-zinc-800 text-gray-700 dark:text-zinc-200'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">
                      {item.special && '🎥 '}
                      {item.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 dark:border-zinc-800 p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-zinc-400">
              <MapPin className="w-4 h-4" />
              <span>Petrou Spyropoulou 2 18346 Moschato</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-zinc-400">
              <Phone className="w-4 h-4" />
              <span>+30 21 0300 7010</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-zinc-400">
              <Mail className="w-4 h-4" />
              <span>info@elmp.gr</span>
            </div>
            <div className="pt-2 text-xs text-gray-500 dark:text-zinc-500">
              {t.footer.copyright}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
