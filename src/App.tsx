
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import VotersPage from "./pages/voters/VotersPage";
import EventsPage from "./pages/events/EventsPage";
import TasksPage from "./pages/tasks/TasksPage";
import CommunicationPage from "./pages/communication/CommunicationPage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import TeamPage from "./pages/team/TeamPage";
import AgentsPage from "./pages/agents/AgentsPage";
import AddAgentPage from "./pages/agents/AddAgentPage";
import AuthPage from "./pages/auth/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            
            <Route path="/voters" element={<VotersPage />} />
            <Route path="/voters/segments" element={<VotersPage />} />
            <Route path="/voters/interactions" element={<VotersPage />} />
            <Route path="/voters/add" element={<VotersPage />} />
            <Route path="/voters/:id" element={<VotersPage />} />
            <Route path="/voters/:id/edit" element={<VotersPage />} />
            <Route path="/voters/segments/new" element={<VotersPage />} />
            <Route path="/voters/segments/:id" element={<VotersPage />} />
            <Route path="/voters/interactions/new" element={<VotersPage />} />
            
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/agents/add" element={<AddAgentPage />} />
            <Route path="/agents/:id" element={<AgentsPage />} />
            <Route path="/agents/:id/edit" element={<AgentsPage />} />
            
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/upcoming" element={<EventsPage />} />
            <Route path="/events/past" element={<EventsPage />} />
            <Route path="/events/new" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventsPage />} />
            
            <Route path="/tasks" element={<TasksPage />} />
            
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/add" element={<TeamPage />} />
            <Route path="/team/:id" element={<TeamPage />} />
            <Route path="/team/:id/edit" element={<TeamPage />} />
            
            <Route path="/communication" element={<CommunicationPage />} />
            <Route path="/communication/messages" element={<CommunicationPage />} />
            <Route path="/communication/voicemail" element={<CommunicationPage />} />
            <Route path="/communication/calls" element={<CommunicationPage />} />
            <Route path="/communication/messages/compose" element={<CommunicationPage />} />
            
            <Route path="/analytics" element={<AnalyticsPage />} />
            
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
