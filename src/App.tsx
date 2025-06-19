import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Exhibits from "./pages/Exhibits";
import ExhibitsPermanent from "./pages/ExhibitsPermanent";
import ExhibitsTemporary from "./pages/ExhibitsTemporary";
import ExhibitsFeatured from "./pages/ExhibitsFeatured";
import ExhibitsComputers from "./pages/ExhibitsComputers";
import ExhibitsSoftware from "./pages/ExhibitsSoftware";
import ExhibitsGaming from "./pages/ExhibitsGaming";
import ExhibitsNetworking from "./pages/ExhibitsNetworking";
import VisitPlan from "./pages/VisitPlan";
import VisitHours from "./pages/VisitHours";
import VisitPrices from "./pages/VisitPrices";
import VisitAccessibility from "./pages/VisitAccessibility";
import VisitGroups from "./pages/VisitGroups";
import VisitSchools from "./pages/VisitSchools";
import VirtualTour from "./pages/VirtualTour";
import TicketsIndividual from "./pages/TicketsIndividual";
import TicketsGroups from "./pages/TicketsGroups";
import TicketsSchools from "./pages/TicketsSchools";
import TicketsMoreCom from "./pages/TicketsMoreCom";
import ActivitiesEducation from "./pages/ActivitiesEducation";
import ActivitiesWorkshops from "./pages/ActivitiesWorkshops";
import ActivitiesEvents from "./pages/ActivitiesEvents";
import ActivitiesCamps from "./pages/ActivitiesCamps";
import ActivitiesAdult from "./pages/ActivitiesAdult";
import SupportAdopt from "./pages/SupportAdopt";
import SupportFriends from "./pages/SupportFriends";
import SupportCorporate from "./pages/SupportCorporate";
import SupportVolunteer from "./pages/SupportVolunteer";
import SupportDonate from "./pages/SupportDonate";
import DontMissThese from "./pages/DontMissThese";
import PacmanTimelinePage from './pages/PacmanTimelinePage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/exhibits" element={<Exhibits />} />
              <Route path="/exhibits/permanent" element={<ExhibitsPermanent />} />
              <Route path="/exhibits/temporary" element={<ExhibitsTemporary />} />
              <Route path="/exhibits/featured" element={<ExhibitsFeatured />} />
              <Route path="/exhibits/computers" element={<ExhibitsComputers />} />
              <Route path="/exhibits/software" element={<ExhibitsSoftware />} />
              <Route path="/exhibits/gaming" element={<ExhibitsGaming />} />
              <Route path="/exhibits/networking" element={<ExhibitsNetworking />} />
              <Route path="/visit" element={<VisitPlan />} />
              <Route path="/visit/hours" element={<VisitHours />} />
              <Route path="/visit/prices" element={<VisitPrices />} />
              <Route path="/visit/accessibility" element={<VisitAccessibility />} />
              <Route path="/visit/groups" element={<VisitGroups />} />
              <Route path="/visit/schools" element={<VisitSchools />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
              <Route path="/tickets/individual" element={<TicketsIndividual />} />
              <Route path="/tickets/groups" element={<TicketsGroups />} />
              <Route path="/tickets/schools" element={<TicketsSchools />} />
              <Route path="/tickets/more-com" element={<TicketsMoreCom />} />
              <Route path="/activities/education" element={<ActivitiesEducation />} />
              <Route path="/activities/workshops" element={<ActivitiesWorkshops />} />
              <Route path="/activities/events" element={<ActivitiesEvents />} />
              <Route path="/activities/camps" element={<ActivitiesCamps />} />
              <Route path="/activities/adult" element={<ActivitiesAdult />} />
              <Route path="/support/adopt" element={<SupportAdopt />} />
              <Route path="/support/friends" element={<SupportFriends />} />
              <Route path="/support/corporate" element={<SupportCorporate />} />
              <Route path="/support/volunteer" element={<SupportVolunteer />} />
              <Route path="/support/donate" element={<SupportDonate />} />
              <Route path="/dont-miss-these" element={<DontMissThese />} />
              <Route path="/timeline" element={<PacmanTimelinePage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
