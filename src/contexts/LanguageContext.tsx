
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LanguageVersion = 'en' | 'gr' | 'easy';

interface LanguageContextType {
  currentVersion: LanguageVersion;
  setCurrentVersion: (version: LanguageVersion) => void;
  translations: Record<LanguageVersion, any>;
}

const translations = {
  en: {
    siteName: "Hellenic IT Museum",
    tagline: "Digital Heritage Experience",
    hero: {
      title: "Experience Digital Heritage at Greece's Premier IT Museum",
      subtitle: "Discover the evolution of computing technology through interactive exhibits, virtual tours, and hands-on experiences. From ancient algorithms to modern AI - explore how technology shaped our world.",
      watchVideo: "Watch Our Story",
      visitToday: "Visit Today",
      stats: {
        artifacts: "3,000+ Artifacts",
        visitors: "50,000+ Visitors",
        years: "40+ Years History"
      }
    },
    dontMiss: {
      title: "Don't Miss These! ⭐",
      subtitle: "Our most popular and remarkable exhibits that visitors absolutely love",
      items: [
        {
          title: "Apple Lisa Computer",
          description: "The revolutionary GUI pioneer from 1983",
          badge: "Rare Find"
        },
        {
          title: "UNIX Source Code",
          description: "Original Bell Labs documentation",
          badge: "Historical"
        },
        {
          title: "Gaming Evolution",
          description: "From Pong to PlayStation",
          badge: "Interactive"
        }
      ]
    },
    quickActions: [
      {
        title: "Virtual Tour",
        description: "Explore from home"
      },
      {
        title: "Buy Tickets",
        description: "Skip the line"
      },
      {
        title: "Adopt Computer",
        description: "Support heritage"
      },
      {
        title: "School Programs",
        description: "Educational visits"
      }
    ],
    navigation: {
      home: "Home",
      exhibits: "Exhibits",
      visit: "Visit",
      tickets: "E-Tickets",
      activities: "Activities",
      virtualTour: "3D Virtual Tour",
      support: "Support Us"
    },
    footer: {
      location: "Athens, Greece",
      copyright: "© 2024 Hellenic IT Museum®"
    }
  },
  gr: {
    siteName: "Ελληνικό Μουσείο Πληροφορικής",
    tagline: "Εμπειρία Ψηφιακής Κληρονομιάς",
    hero: {
      title: "Ζήστε την Ψηφιακή Κληρονομιά στο Κορυφαίο Μουσείο Πληροφορικής της Ελλάδας",
      subtitle: "Ανακαλύψτε την εξέλιξη της τεχνολογίας υπολογιστών μέσα από διαδραστικές εκθέσεις, εικονικές περιηγήσεις και πρακτικές εμπειρίες. Από αρχαίους αλγορίθμους έως σύγχρονη τεχνητή νοημοσύνη - εξερευνήστε πώς η τεχνολογία διαμόρφωσε τον κόσμο μας.",
      watchVideo: "Δείτε την Ιστορία μας",
      visitToday: "Επισκεφθείτε Σήμερα",
      stats: {
        artifacts: "3.000+ Εκθέματα",
        visitors: "50.000+ Επισκέπτες",
        years: "40+ Χρόνια Ιστορίας"
      }
    },
    dontMiss: {
      title: "Μη Χάσετε Αυτά! ⭐",
      subtitle: "Τα πιο δημοφιλή και αξιοσημείωτα εκθέματά μας που οι επισκέπτες λατρεύουν",
      items: [
        {
          title: "Υπολογιστής Apple Lisa",
          description: "Ο επαναστατικός πρωτοπόρος GUI από το 1983",
          badge: "Σπάνιο Εύρημα"
        },
        {
          title: "Πηγαίος Κώδικας UNIX",
          description: "Πρωτότυπη τεκμηρίωση Bell Labs",
          badge: "Ιστορικό"
        },
        {
          title: "Εξέλιξη Gaming",
          description: "Από το Pong στο PlayStation",
          badge: "Διαδραστικό"
        }
      ]
    },
    quickActions: [
      {
        title: "Εικονική Περιήγηση",
        description: "Εξερευνήστε από το σπίτι"
      },
      {
        title: "Αγορά Εισιτηρίων",
        description: "Παρακάμψτε την ουρά"
      },
      {
        title: "Υιοθετήστε Υπολογιστή",
        description: "Υποστηρίξτε την κληρονομιά"
      },
      {
        title: "Σχολικά Προγράμματα",
        description: "Εκπαιδευτικές επισκέψεις"
      }
    ],
    navigation: {
      home: "Αρχική",
      exhibits: "Εκθέματα",
      visit: "Επίσκεψη",
      tickets: "Ηλ. Εισιτήρια",
      activities: "Δραστηριότητες",
      virtualTour: "3D Εικονική Περιήγηση",
      support: "Υποστηρίξτε μας"
    },
    footer: {
      location: "Αθήνα, Ελλάδα",
      copyright: "© 2024 Ελληνικό Μουσείο Πληροφορικής®"
    }
  },
  easy: {
    siteName: "IT Museum - Easy Read",
    tagline: "Learn About Computers",
    hero: {
      title: "Welcome to the Computer Museum",
      subtitle: "We have old and new computers. You can see them and learn about them. It is fun and easy to understand.",
      watchVideo: "Watch Video",
      visitToday: "Come Visit Us",
      stats: {
        artifacts: "Many Old Computers",
        visitors: "Lots of Happy Visitors",
        years: "Open for 40 Years"
      }
    },
    dontMiss: {
      title: "Best Things to See ⭐",
      subtitle: "These are the most popular things in our museum",
      items: [
        {
          title: "Apple Lisa Computer",
          description: "A very special old computer from 1983",
          badge: "Very Special"
        },
        {
          title: "Old Computer Code",
          description: "How people wrote computer programs long ago",
          badge: "Old History"
        },
        {
          title: "Video Games",
          description: "From old games to new games",
          badge: "Fun to Try"
        }
      ]
    },
    quickActions: [
      {
        title: "Online Tour",
        description: "See the museum online"
      },
      {
        title: "Buy Tickets",
        description: "Get tickets to visit"
      },
      {
        title: "Help a Computer",
        description: "Help us keep computers safe"
      },
      {
        title: "School Visits",
        description: "Bring your class here"
      }
    ],
    navigation: {
      home: "Home",
      exhibits: "Things to See",
      visit: "Come Visit",
      tickets: "Get Tickets",
      activities: "Things to Do",
      virtualTour: "Online Tour",
      support: "Help Us"
    },
    footer: {
      location: "Athens, Greece",
      copyright: "© 2024 IT Museum"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentVersion, setCurrentVersion] = useState<LanguageVersion>('en');

  return (
    <LanguageContext.Provider value={{ currentVersion, setCurrentVersion, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
