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
    dontMissAppleLisa: "Experience the groundbreaking Apple Lisa computer from 1983, one of the first personal computers with a graphical user interface. This rare specimen represents a pivotal moment in computing history.",
    dontMissUnix: "Explore original Bell Labs UNIX documentation and source code that revolutionized operating systems. A testament to the foundations of modern computing.",
    dontMissGaming: "Journey through the evolution of video gaming, from the earliest arcade machines to modern consoles. An interactive exhibit that showcases how gaming has shaped digital entertainment.",
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
    },
    tickets: {
      individual: {
        title: "Buy Individual Tickets",
        description: "Purchase your ticket to visit the museum. Online sales coming soon."
      },
      groups: {
        title: "Group Bookings",
        description: "Book tickets for groups and enjoy special conditions for group visits."
      },
      schools: {
        title: "School Programs",
        description: "Schedule school visits and discover our educational programs for students."
      },
      moreCom: {
        title: "More.com Integration",
        description: "Soon, integration with More.com for online ticket purchases."
      }
    },
    activities: {
      education: {
        title: "Educational Programs",
        description: "Discover our educational programs for all ages, promoting technology education."
      },
      workshops: {
        title: "Workshops",
        description: "Join hands-on workshops about technology, computing, and history."
      },
      events: {
        title: "Events Calendar",
        description: "Check the museum's event calendar and join our special activities."
      },
      camps: {
        title: "Summer Camps",
        description: "Participate in our summer camps with tech and educational activities."
      },
      adult: {
        title: "Adult Learning",
        description: "Courses and activities for adults interested in technology and computing history."
      }
    },
    support: {
      adopt: {
        title: "Adopt a Computer",
        description: "Help preserve computing history by adopting a computer from our collection."
      },
      friends: {
        title: "Become a Friend",
        description: "Become a friend of the museum and support our preservation and education initiatives."
      },
      corporate: {
        title: "Corporate Partnerships",
        description: "Companies can support the museum through partnerships and sponsorships."
      },
      volunteer: {
        title: "Volunteer",
        description: "Become a volunteer and help with the museum's operations and activities."
      },
      donate: {
        title: "Donations",
        description: "Make a donation to help maintain and expand the museum's collection."
      }
    },
    visit: {
      hours: {
        title: "Opening Hours",
        regularTitle: "Regular Hours",
        regularHours: [
          { day: "Monday", time: "Closed" },
          { day: "Tuesday - Friday", time: "10:00 - 18:00" },
          { day: "Saturday", time: "10:00 - 20:00" },
          { day: "Sunday", time: "11:00 - 17:00" }
        ],
        holidayTitle: "Holiday Schedule",
        holidays: [
          "New Year's Day - Closed",
          "Easter Sunday - Closed",
          "Christmas Day - Closed",
          "Special exhibitions may have extended hours"
        ],
        noticeTitle: "Special Notice",
        noticeDesc: "Hours may vary during special events and holidays. Please contact us to confirm opening times.",
        contactButton: "Contact Us",
        planTitle: "Plan Your Visit",
        planDesc: "Make the most of your visit by checking our current exhibitions and events.",
        planButton: "View Calendar"
      },
      plan: {
        title: "Plan Your Visit",
        locationTitle: "Location",
        address: "123 Tech Avenue, Athens 12345, Greece",
        busTitle: "Bus Lines",
        busLines: [
          "Line 1: Stop at Tech Square",
          "Line 2: Stop at Museum District",
          "Line 3: Direct to Museum"
        ],
        metroTitle: "Metro Access",
        metroLines: [
          "Blue Line: Tech Station",
          "Red Line: Museum Station",
          "5 minute walk from either station"
        ],
        parkingTitle: "Parking",
        parkingDesc: "Free parking available for museum visitors in our underground garage.",
        contactTitle: "Need Help?",
        contactDesc: "Our visitor services team is here to help plan your visit.",
        contactButton: "Get in Touch"
      },
      groups: {
        title: "Group Visits",
        corporateTitle: "Corporate Groups",
        corporateDesc: "Special arrangements for corporate team visits and events.",
        corporateFeatures: [
          "Customized guided tours",
          "Meeting space available",
          "Catering options",
          "Team building activities"
        ],
        tourTitle: "Guided Tours",
        tourDesc: "Expert-led tours for groups of 10 or more.",
        tourFeatures: [
          "Interactive demonstrations",
          "Behind-the-scenes access",
          "Q&A sessions",
          "Hands-on activities"
        ],
        bookingTitle: "Book Your Group Visit",
        bookingDesc: "Contact us to arrange your group visit and discuss special requirements.",
        bookingButton: "Make a Booking"
      },
      prices: {
        title: "Admission Prices",
        description: "See all ticket prices for individuals, groups, students, and special categories. Discounts available for children, students, seniors, and people with disabilities. Contact us for more information."
      },
      accessibility: {
        title: "Accessibility",
        description: "The museum is fully accessible to visitors with reduced mobility. Elevators, ramps, and accessible restrooms are available. For special assistance, please contact our staff in advance."
      },
      schools: {
        title: "School Programs",
        description: "Discover our educational programs for schools. Guided tours, interactive workshops, and hands-on activities designed for students of all ages. Book your school visit today!"
      }
    },
    virtualTour: {
      title: "3D Virtual Tour",
      controlsTitle: "Controls",
      controls: [
        "Click and drag to look around",
        "Scroll to zoom in/out",
        "Double click to move forward",
        "Use arrow keys to navigate"
      ],
      featuresTitle: "Features",
      features: [
        "360° panoramic views",
        "Interactive exhibits",
        "Information hotspots",
        "High-resolution images"
      ],
      vrTitle: "VR Experience",
      vrDesc: "Experience the museum in virtual reality using your VR headset.",
      vrButton: "Launch VR Mode",
      highlightsTitle: "Exhibition Highlights",
      highlightsDesc: "Explore our most popular exhibits in stunning detail.",
      highlights: [
        {
          name: "First Computer Room",
          desc: "See the evolution of computing",
          image: "/img/virtual-tour/computers.jpg"
        },
        {
          name: "Gaming Section",
          desc: "Interactive gaming history",
          image: "/img/virtual-tour/gaming.jpg"
        },
        {
          name: "Innovation Lab",
          desc: "Modern technology showcase",
          image: "/img/virtual-tour/lab.jpg"
        },
        {
          name: "Historical Timeline",
          desc: "Journey through IT history",
          image: "/img/virtual-tour/timeline.jpg"
        }
      ],
      timelineClose: "Close",
      timelineInstruction: "Drag or click the icons to explore the evolution of technology!"
    },
    timeline: [
      {
        year: "1920",
        title: "Old Radio",
        icon: "📻",
        image: "/lovable-uploads/galena_radio.jpg",
        description: "Radios worked without electricity.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae2e2.mp3",
          video: "https://www.youtube.com/embed/1K5QdP6zKpA"
        }
      },
      {
        year: "1954",
        title: "First TV in Greece",
        icon: "📺",
        image: "/lovable-uploads/tv_1950s.jpg",
        description: "TV made learning and fun easier.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae2e2.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1977",
        title: "Apple II Computer",
        icon: "🍏",
        image: "/lovable-uploads/apple_ii.jpg",
        description: "A simple home computer.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1b5pQ1y2Q2g"
        }
      },
      {
        year: "1983",
        title: "Apple Lisa",
        icon: "🖥️",
        image: "/lovable-uploads/apple_lisa.jpg",
        description: "First computer with pictures on the screen.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1985",
        title: "Commodore Amiga",
        icon: "🕹️",
        image: "/lovable-uploads/amiga500.jpg",
        description: "Games and music at home.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1991",
        title: "Linux",
        icon: "🐧",
        image: "/lovable-uploads/linux_logo.jpg",
        description: "A free computer system for everyone.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1994",
        title: "PlayStation",
        icon: "🎮",
        image: "/lovable-uploads/psx_console.jpg",
        description: "3D games became very popular.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/6QyVil0dwhk"
        }
      },
      {
        year: "2007",
        title: "iPhone",
        icon: "📱",
        image: "/lovable-uploads/iphone_1stgen.jpg",
        description: "Phones became smart and could do many things.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/vn2qXpcon-s"
        }
      }
    ],
    timelineClose: "Close",
    timelineInstruction: "Touch or click the icons to see technology change!"
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
    dontMissAppleLisa: "Ανακαλύψτε τον πρωτοποριακό υπολογιστή Apple Lisa του 1983, έναν από τους πρώτους προσωπικούς υπολογιστές με γραφικό περιβάλλον χρήστη. Αυτό το σπάνιο δείγμα αντιπροσωπεύει μια κρίσιμη στιγμή στην ιστορία της πληροφορικής.",
    dontMissUnix: "Εξερευνήστε την αυθεντική τεκμηρίωση και τον πηγαίο κώδικα του UNIX από τα Bell Labs που φέρανε επανάσταση στα λειτουργικά συστήματα. Μια μαρτυρία των θεμελίων της σύγχρονης πληροφορικής.",
    dontMissGaming: "Ταξιδέψτε στην εξέλιξη των βιντεοπαιχνιδιών, από τα πρώτα μηχανήματα arcade μέχρι τις σύγχρονες κονσόλες. Μια διαδραστική έκθεση που αναδεικνύει πώς τα παιχνίδια διαμόρφωσαν την ψηφιακή ψυχαγωγία.",
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
    },
    tickets: {
      individual: {
        title: "Αγορά Ατομικών Εισιτηρίων",
        description: "Αγοράστε το εισιτήριό σας για να επισκεφθείτε το μουσείο. Η online πώληση σύντομα."
      },
      groups: {
        title: "Κρατήσεις για Ομάδες",
        description: "Κλείστε εισιτήρια για ομάδες και επωφεληθείτε από ειδικές συνθήκες για ομαδικές επισκέψεις."
      },
      schools: {
        title: "Σχολικά Προγράμματα",
        description: "Προγραμματίστε σχολικές επισκέψεις και γνωρίστε τα εκπαιδευτικά μας προγράμματα."
      },
      moreCom: {
        title: "Ενσωμάτωση More.com",
        description: "Σύντομα, ενσωμάτωση με το More.com για online αγορά εισιτηρίων."
      }
    },
    activities: {
      education: {
        title: "Εκπαιδευτικά Προγράμματα",
        description: "Γνωρίστε τα εκπαιδευτικά μας προγράμματα για όλες τις ηλικίες, προωθώντας την τεχνολογική εκπαίδευση."
      },
      workshops: {
        title: "Εργαστήρια",
        description: "Συμμετέχετε σε πρακτικά εργαστήρια για τεχνολογία, πληροφορική και ιστορία."
      },
      events: {
        title: "Ημερολόγιο Εκδηλώσεων",
        description: "Δείτε το ημερολόγιο εκδηλώσεων του μουσείου και συμμετέχετε στις ειδικές μας δραστηριότητες."
      },
      camps: {
        title: "Θερινά Camps",
        description: "Συμμετέχετε στα θερινά μας camps με τεχνολογικές και εκπαιδευτικές δραστηριότητες."
      },
      adult: {
        title: "Εκπαίδευση Ενηλίκων",
        description: "Μαθήματα και δραστηριότητες για ενήλικες με ενδιαφέρον στην τεχνολογία και την ιστορία της πληροφορικής."
      }
    },
    support: {
      adopt: {
        title: "Υιοθετήστε Υπολογιστή",
        description: "Βοηθήστε να διατηρηθεί η ιστορία της πληροφορικής υιοθετώντας έναν υπολογιστή από τη συλλογή μας."
      },
      friends: {
        title: "Γίνετε Φίλος",
        description: "Γίνετε φίλος του μουσείου και στηρίξτε τις πρωτοβουλίες διατήρησης και εκπαίδευσης."
      },
      corporate: {
        title: "Εταιρικές Συνεργασίες",
        description: "Οι εταιρείες μπορούν να στηρίξουν το μουσείο μέσω συνεργασιών και χορηγιών."
      },
      volunteer: {
        title: "Εθελοντισμός",
        description: "Γίνετε εθελοντής και βοηθήστε στη λειτουργία και τις δραστηριότητες του μουσείου."
      },
      donate: {
        title: "Δωρεές",
        description: "Κάντε μια δωρεά για να βοηθήσετε στη διατήρηση και την επέκταση της συλλογής του μουσείου."
      }
    },
    visit: {
      hours: {
        title: "Ώρες Λειτουργίας",
        regularTitle: "Κανονικό Ωράριο",
        regularHours: [
          { day: "Δευτέρα", time: "Κλειστά" },
          { day: "Τρίτη - Παρασκευή", time: "10:00 - 18:00" },
          { day: "Σάββατο", time: "10:00 - 20:00" },
          { day: "Κυριακή", time: "11:00 - 17:00" }
        ],
        holidayTitle: "Αργίες",
        holidays: [
          "Πρωτοχρονιά - Κλειστά",
          "Κυριακή του Πάσχα - Κλειστά",
          "Χριστούγεννα - Κλειστά",
          "Οι ειδικές εκθέσεις μπορεί να έχουν διευρυμένο ωράριο"
        ],
        noticeTitle: "Ειδική Ανακοίνωση",
        noticeDesc: "Το ωράριο μπορεί να διαφέρει κατά τη διάρκεια ειδικών εκδηλώσεων και αργιών. Παρακαλούμε επικοινωνήστε μαζί μας για επιβεβαίωση.",
        contactButton: "Επικοινωνία",
        planTitle: "Σχεδιάστε την Επίσκεψή σας",
        planDesc: "Αξιοποιήστε στο έπακρο την επίσκεψή σας ελέγχοντας τις τρέχουσες εκθέσεις και εκδηλώσεις.",
        planButton: "Προβολή Ημερολογίου"
      },
      plan: {
        title: "Σχεδιάστε την Επίσκεψή σας",
        locationTitle: "Τοποθεσία",
        address: "Λεωφόρος Τεχνολογίας 123, Αθήνα 12345",
        busTitle: "Λεωφορειακές Γραμμές",
        busLines: [
          "Γραμμή 1: Στάση Πλατεία Τεχνολογίας",
          "Γραμμή 2: Στάση Μουσείο",
          "Γραμμή 3: Απευθείας στο Μουσείο"
        ],
        metroTitle: "Πρόσβαση με Μετρό",
        metroLines: [
          "Μπλε Γραμμή: Σταθμός Τεχνολογίας",
          "Κόκκινη Γραμμή: Σταθμός Μουσείου",
          "5 λεπτά με τα πόδια από κάθε σταθμό"
        ],
        parkingTitle: "Στάθμευση",
        parkingDesc: "Δωρεάν πάρκινγκ για τους επισκέπτες του μουσείου στο υπόγειο γκαράζ.",
        contactTitle: "Χρειάζεστε Βοήθεια;",
        contactDesc: "Η ομάδα εξυπηρέτησης επισκεπτών είναι εδώ για να βοηθήσει στο σχεδιασμό της επίσκεψής σας.",
        contactButton: "Επικοινωνήστε μαζί μας"
      },
      groups: {
        title: "Ομαδικές Επισκέψεις",
        corporateTitle: "Εταιρικές Ομάδες",
        corporateDesc: "Ειδικές ρυθμίσεις για εταιρικές επισκέψεις και εκδηλώσεις.",
        corporateFeatures: [
          "Προσαρμοσμένες ξεναγήσεις",
          "Διαθέσιμος χώρος συναντήσεων",
          "Επιλογές catering",
          "Δραστηριότητες team building"
        ],
        tourTitle: "Ξεναγήσεις",
        tourDesc: "Ξεναγήσεις από ειδικούς για ομάδες 10 ατόμων και άνω.",
        tourFeatures: [
          "Διαδραστικές επιδείξεις",
          "Πρόσβαση στα παρασκήνια",
          "Συνεδρίες Ε&Α",
          "Πρακτικές δραστηριότητες"
        ],
        bookingTitle: "Κράτηση Ομαδικής Επίσκεψης",
        bookingDesc: "Επικοινωνήστε μαζί μας για να οργανώσετε την ομαδική σας επίσκεψη και να συζητήσετε ειδικές απαιτήσεις.",
        bookingButton: "Κάντε Κράτηση"
      },
      prices: {
        title: "Τιμές Εισόδου",
        description: "Δείτε όλες τις τιμές εισιτηρίων για μεμονωμένους επισκέπτες, ομάδες, μαθητές και ειδικές κατηγορίες. Εκπτώσεις για παιδιά, φοιτητές, ηλικιωμένους και ΑμεΑ. Επικοινωνήστε μαζί μας για περισσότερες πληροφορίες."
      },
      accessibility: {
        title: "Προσβασιμότητα",
        description: "Το μουσείο είναι πλήρως προσβάσιμο σε άτομα με μειωμένη κινητικότητα. Διαθέτουμε ανελκυστήρες, ράμπες και προσβάσιμες τουαλέτες. Για ειδική βοήθεια, παρακαλούμε επικοινωνήστε με το προσωπικό μας εκ των προτέρων."
      },
      schools: {
        title: "Σχολικά Προγράμματα",
        description: "Ανακαλύψτε τα εκπαιδευτικά μας προγράμματα για σχολεία. Ξεναγήσεις, διαδραστικά εργαστήρια και βιωματικές δραστηριότητες για μαθητές όλων των ηλικιών. Κλείστε την επίσκεψη του σχολείου σας σήμερα!"
      }
    },
    virtualTour: {
      title: "Εικονική Περιήγηση 3D",
      controlsTitle: "Χειριστήρια",
      controls: [
        "Κλικ και σύρσιμο για περιήγηση",
        "Κύλιση για μεγέθυνση/σμίκρυνση",
        "Διπλό κλικ για μετακίνηση μπροστά",
        "Χρήση βελών για πλοήγηση"
      ],
      featuresTitle: "Χαρακτηριστικά",
      features: [
        "Πανοραμικές προβολές 360°",
        "Διαδραστικά εκθέματα",
        "Σημεία πληροφοριών",
        "Εικόνες υψηλής ανάλυσης"
      ],
      vrTitle: "Εμπειρία VR",
      vrDesc: "Εξερευνήστε το μουσείο σε εικονική πραγματικότητα με τη συσκευή VR σας.",
      vrButton: "Εκκίνηση Λειτουργίας VR",
      highlightsTitle: "Κορυφαία Εκθέματα",
      highlightsDesc: "Εξερευνήστε τα πιο δημοφιλή εκθέματά μας σε εντυπωσιακή λεπτομέρεια.",
      highlights: [
        {
          name: "Αίθουσα Πρώτων Υπολογιστών",
          desc: "Δείτε την εξέλιξη της πληροφορικής",
          image: "/img/virtual-tour/computers.jpg"
        },
        {
          name: "Τμήμα Παιχνιδιών",
          desc: "Διαδραστική ιστορία gaming",
          image: "/img/virtual-tour/gaming.jpg"
        },
        {
          name: "Εργαστήριο Καινοτομίας",
          desc: "Έκθεση σύγχρονης τεχνολογίας",
          image: "/img/virtual-tour/lab.jpg"
        },
        {
          name: "Ιστορική Χρονογραμμή",
          desc: "Ταξίδι στην ιστορία της πληροφορικής",
          image: "/img/virtual-tour/timeline.jpg"
        }
      ],
      timelineClose: "Κλείσιμο",
      timelineInstruction: "Σύρετε ή κάντε κλικ στα εικονίδια για να εξερευνήσετε την εξέλιξη της τεχνολογίας!"
    },
    timeline: [
      {
        year: "1920",
        title: "Παλαιό Ραδιόφωνο",
        icon: "📻",
        image: "/lovable-uploads/galena_radio.jpg",
        description: "Οι άνθρωποι άκουγαν ραδιόφωνο χωρίς ηλεκτρικό ρεύμα.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae2e2.mp3",
          video: "https://www.youtube.com/embed/1K5QdP6zKpA"
        }
      },
      {
        year: "1954",
        title: "Πρώτη Τηλεόραση στην Ελλάδα",
        icon: "📺",
        image: "/lovable-uploads/tv_1950s.jpg",
        description: "Η τηλεόραση άλλαξε τον τρόπο διασκέδασης και μάθησης.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae2e2.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1977",
        title: "Υπολογιστής Apple II",
        icon: "🍏",
        image: "/lovable-uploads/apple_ii.jpg",
        description: "Ένας από τους πρώτους οικιακούς υπολογιστές.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1b5pQ1y2Q2g"
        }
      },
      {
        year: "1983",
        title: "Apple Lisa",
        icon: "🖥️",
        image: "/lovable-uploads/apple_lisa.jpg",
        description: "Ο πρώτος υπολογιστής με εικόνες στην οθόνη.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1985",
        title: "Commodore Amiga",
        icon: "🕹️",
        image: "/lovable-uploads/amiga500.jpg",
        description: "Διασκέδαση με παιχνίδια και μουσική στο σπίτι.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1991",
        title: "Linux",
        icon: "🐧",
        image: "/lovable-uploads/linux_logo.jpg",
        description: "Ένα ελεύθερο λειτουργικό σύστημα για όλους.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1994",
        title: "PlayStation",
        icon: "🎮",
        image: "/lovable-uploads/psx_console.jpg",
        description: "Τα 3D παιχνίδια έγιναν πολύ δημοφιλή.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/6QyVil0dwhk"
        }
      },
      {
        year: "2007",
        title: "iPhone",
        icon: "📱",
        image: "/lovable-uploads/iphone_1stgen.jpg",
        description: "Τα τηλέφωνα έγιναν έξυπνα και πολυλειτουργικά.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/vn2qXpcon-s"
        }
      }
    ],
    timelineClose: "Κλείσιμο",
    timelineInstruction: "Κάντε κλικ ή αγγίξτε τα εικονίδια για να δείτε την εξέλιξη της τεχνολογίας!"
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
    dontMissAppleLisa: "See one of the first computers that had pictures instead of just text! The Apple Lisa from 1983 changed how we use computers today.",
    dontMissUnix: "Look at the original plans for UNIX, a special computer system that helped create many of today's computers and phones.",
    dontMissGaming: "Play and learn about video games from the past to now! See how games changed from simple dots to amazing 3D worlds.",
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
    },
    tickets: {
      individual: {
        title: "Buy a Ticket",
        description: "Get your ticket to visit the museum. Online tickets soon."
      },
      groups: {
        title: "Group Tickets",
        description: "Book tickets for your group. Special prices for groups."
      },
      schools: {
        title: "School Visits",
        description: "Plan a visit for your school. Learn and have fun."
      },
      moreCom: {
        title: "Online Tickets",
        description: "Soon you can buy tickets online easily."
      }
    },
    activities: {
      education: {
        title: "Learn with Us",
        description: "We have simple lessons for everyone."
      },
      workshops: {
        title: "Workshops",
        description: "Join our easy workshops about computers and games."
      },
      events: {
        title: "Events",
        description: "See our events. Join and have fun."
      },
      camps: {
        title: "Summer Camp",
        description: "Come to our summer camp. Play and learn."
      },
      adult: {
        title: "For Adults",
        description: "Adults can learn about computers too."
      }
    },
    support: {
      adopt: {
        title: "Help a Computer",
        description: "You can help us take care of old computers."
      },
      friends: {
        title: "Be a Friend",
        description: "Be our friend and help the museum."
      },
      corporate: {
        title: "Company Help",
        description: "Companies can help the museum."
      },
      volunteer: {
        title: "Volunteer",
        description: "Help us as a volunteer."
      },
      donate: {
        title: "Donate",
        description: "Give money to help the museum."
      }
    },
    visit: {
      hours: {
        title: "When We Are Open",
        regularTitle: "Opening Times",
        regularHours: [
          { day: "Monday", time: "Closed" },
          { day: "Tuesday to Friday", time: "10 AM to 6 PM" },
          { day: "Saturday", time: "10 AM to 8 PM" },
          { day: "Sunday", time: "11 AM to 5 PM" }
        ],
        holidayTitle: "Holiday Times",
        holidays: [
          "New Year's Day - We are closed",
          "Easter Sunday - We are closed",
          "Christmas Day - We are closed",
          "Some special shows may stay open longer"
        ],
        noticeTitle: "Important Info",
        noticeDesc: "Times might change for special events. Please ask us to make sure we are open.",
        contactButton: "Ask Us",
        planTitle: "Plan Your Visit",
        planDesc: "Check what's on when you want to visit.",
        planButton: "See What's On"
      },
      plan: {
        title: "Plan Your Visit",
        locationTitle: "Where We Are",
        address: "123 Tech Avenue, Athens 12345, Greece",
        busTitle: "Getting Here by Bus",
        busLines: [
          "Bus 1: Stop at Tech Square",
          "Bus 2: Stop at Museum",
          "Bus 3: Stops right here"
        ],
        metroTitle: "Getting Here by Train",
        metroLines: [
          "Blue Train: Tech Stop",
          "Red Train: Museum Stop",
          "Short 5 minute walk"
        ],
        parkingTitle: "Parking Your Car",
        parkingDesc: "You can park your car for free in our garage.",
        contactTitle: "Need Help?",
        contactDesc: "We can help you plan your visit.",
        contactButton: "Talk to Us"
      },
      groups: {
        title: "Visit with a Group",
        corporateTitle: "Work Groups",
        corporateDesc: "Special visits for work teams.",
        corporateFeatures: [
          "Special tours just for you",
          "Meeting rooms you can use",
          "Food and drinks available",
          "Fun team activities"
        ],
        tourTitle: "Group Tours",
        tourDesc: "Tours for groups of 10 or more people.",
        tourFeatures: [
          "Try things out",
          "See behind the scenes",
          "Ask questions",
          "Do fun activities"
        ],
        bookingTitle: "Book for Your Group",
        bookingDesc: "Talk to us about bringing your group to visit.",
        bookingButton: "Book Now"
      },
      prices: {
        title: "Ticket Prices",
        description: "See how much tickets cost for everyone. Discounts for kids, students, older people, and people with disabilities. Ask us if you need help."
      },
      accessibility: {
        title: "Easy Access",
        description: "Our museum is easy to visit for everyone. We have ramps, lifts, and special toilets. If you need help, just ask our team."
      },
      schools: {
        title: "School Visits",
        description: "We have fun and simple programs for schools. Book a visit for your class and learn with us!"
      }
    },
    virtualTour: {
      title: "3D Tour from Your Computer",
      controlsTitle: "How to Move Around",
      controls: [
        "Click and drag to look around",
        "Roll mouse wheel to zoom",
        "Double click to move forward",
        "Use arrow keys to move"
      ],
      featuresTitle: "What You Can Do",
      features: [
        "Look all around you",
        "Click on things to learn more",
        "Find information spots",
        "See clear pictures"
      ],
      vrTitle: "VR Headset Tour",
      vrDesc: "Use your VR headset to walk around the museum.",
      vrButton: "Start VR Tour",
      highlightsTitle: "Best Things to See",
      highlightsDesc: "Look at our most popular displays.",
      highlights: [
        {
          name: "Old Computers Room",
          desc: "See how computers changed",
          image: "/img/virtual-tour/computers.jpg"
        },
        {
          name: "Games Area",
          desc: "Play and learn about old games",
          image: "/img/virtual-tour/gaming.jpg"
        },
        {
          name: "New Ideas Lab",
          desc: "See new technology",
          image: "/img/virtual-tour/lab.jpg"
        },
        {
          name: "History Wall",
          desc: "See how computers grew up",
          image: "/img/virtual-tour/timeline.jpg"
        }
      ],
      timelineClose: "Close",
      timelineInstruction: "Touch or click the icons to see technology change!"
    },
    timeline: [
      {
        year: "1920",
        title: "Old Radio",
        icon: "📻",
        image: "/lovable-uploads/galena_radio.jpg",
        description: "Radios worked without electricity.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae2e2.mp3",
          video: "https://www.youtube.com/embed/1K5QdP6zKpA"
        }
      },
      {
        year: "1954",
        title: "First TV in Greece",
        icon: "📺",
        image: "/lovable-uploads/tv_1950s.jpg",
        description: "TV made learning and fun easier.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae2e2.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1977",
        title: "Apple II Computer",
        icon: "🍏",
        image: "/lovable-uploads/apple_ii.jpg",
        description: "A simple home computer.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1b5pQ1y2Q2g"
        }
      },
      {
        year: "1983",
        title: "Apple Lisa",
        icon: "🖥️",
        image: "/lovable-uploads/apple_lisa.jpg",
        description: "First computer with pictures on the screen.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1985",
        title: "Commodore Amiga",
        icon: "🕹️",
        image: "/lovable-uploads/amiga500.jpg",
        description: "Games and music at home.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1991",
        title: "Linux",
        icon: "🐧",
        image: "/lovable-uploads/linux_logo.jpg",
        description: "A free computer system for everyone.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/1QkAupSM1FI"
        }
      },
      {
        year: "1994",
        title: "PlayStation",
        icon: "🎮",
        image: "/lovable-uploads/psx_console.jpg",
        description: "3D games became very popular.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/6QyVil0dwhk"
        }
      },
      {
        year: "2007",
        title: "iPhone",
        icon: "📱",
        image: "/lovable-uploads/iphone_1stgen.jpg",
        description: "Phones became smart and could do many things.",
        extra: {
          sound: "https://cdn.pixabay.com/audio/2022/03/15/audio_115b9e7e2e.mp3",
          video: "https://www.youtube.com/embed/vn2qXpcon-s"
        }
      }
    ],
    timelineClose: "Close",
    timelineInstruction: "Touch or click the icons to see technology change!"
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
