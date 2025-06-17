import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight, Home, Calendar, Camera, Settings, Users, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, LanguageVersion } from '@/contexts/LanguageContext';

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onToggle }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { currentVersion, setCurrentVersion, translations } = useLanguage();
  const t = translations[currentVersion];

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
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
      href: '/'
    },
    {
      id: 'exhibits',
      title: t.navigation.exhibits,
      icon: Camera,
      submenu: [
        { title: 'Permanent Collection', href: '/exhibits/permanent' },
        { title: 'Temporary Exhibitions', href: '/exhibits/temporary' },
        { title: 'Don\'t Miss These!', href: '/exhibits/featured', special: true },
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
      ? "flex-1 py-2 px-3 text-xs font-medium bg-museum-blue text-white rounded-md transition-colors"
      : "flex-1 py-2 px-3 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors";
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-museum-lg transform transition-transform duration-300 ease-out z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-museum-blue to-museum-blue-light rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">HIT</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-gray-900 text-lg leading-tight">
                {t.siteName}
              </h1>
              <p className="text-xs text-museum-gray">{t.tagline}</p>
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
        <div className="p-4 border-b border-gray-100">
          <div className="flex space-x-2">
            <button 
              onClick={() => handleLanguageChange('en')}
              className={getLanguageButtonStyle('en')}
            >
              🇬🇧 EN
            </button>
            <button 
              onClick={() => handleLanguageChange('gr')}
              className={getLanguageButtonStyle('gr')}
            >
              🇬🇷 GR
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
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                        expandedMenus.includes(item.id)
                          ? 'bg-museum-blue/10 text-museum-blue'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {expandedMenus.includes(item.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    
                    {expandedMenus.includes(item.id) && (
                      <ul className="mt-2 ml-8 space-y-1 animate-fade-in">
                        {item.submenu.map((subItem, index) => (
                          <li key={index}>
                            <a
                              href={subItem.href}
                              className={`block p-2 rounded-lg text-sm transition-colors hover:bg-gray-50 ${
                                subItem.special 
                                  ? 'text-museum-blue font-medium hover:bg-museum-blue/5' 
                                  : 'text-gray-600 hover:text-gray-900'
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
                  <a
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${
                      item.special
                        ? 'bg-gradient-to-r from-museum-blue to-museum-blue-light text-white hover:shadow-museum'
                        : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">
                      {item.special && '🎥 '}
                      {item.title}
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{t.footer.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+30 210 xxx xxxx</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>info@elmp.gr</span>
            </div>
            <div className="pt-2 text-xs text-gray-500">
              {t.footer.copyright}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
