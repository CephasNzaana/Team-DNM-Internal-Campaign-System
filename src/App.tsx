
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import VotersPage from "./pages/voters/VotersPage";
import AddVoterPage from "./pages/voters/AddVoterPage";
import EventsPage from "./pages/events/EventsPage";
import AddEventPage from "./pages/events/AddEventPage";
import TasksPage from "./pages/tasks/TasksPage";
import AddTaskPage from "./pages/tasks/AddTaskPage";
import CommunicationPage from "./pages/communication/CommunicationPage";
import ComposeMessagePage from "./pages/communication/ComposeMessagePage";
import AnalyticsPage from "./pages/analytics/AnalyticsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import TeamPage from "./pages/team/TeamPage";
import AddTeamMemberPage from "./pages/team/AddTeamMemberPage";
import AgentsPage from "./pages/agents/AgentsPage";
import AddAgentPage from "./pages/agents/AddAgentPage";
import AccountPage from "./pages/account/AccountPage";
import AuthPage from "./pages/auth/AuthPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected routes requiring authentication */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                
                {/* Voter management routes */}
                <Route element={<ProtectedRoute allowedRoles={['honDNM', 'admin']} />}>
                  <Route path="/voters" element={<VotersPage />} />
                  <Route path="/voters/add" element={<AddVoterPage />} />
                  <Route path="/voters/segments" element={<VotersPage />} />
                  <Route path="/voters/interactions" element={<VotersPage />} />
                  <Route path="/voters/:id" element={<VotersPage />} />
                  <Route path="/voters/:id/edit" element={<VotersPage />} />
                  <Route path="/voters/segments/new" element={<VotersPage />} />
                  <Route path="/voters/segments/:id" element={<VotersPage />} />
                  <Route path="/voters/interactions/new" element={<VotersPage />} />
                </Route>
                
                {/* Agent routes - admin and team members can access */}
                <Route element={<ProtectedRoute allowedRoles={['admin', 'teamMember']} />}>
                  <Route path="/agents" element={<AgentsPage />} />
                  <Route path="/agents/add" element={<AddAgentPage />} />
                  <Route path="/agents/:id" element={<AgentsPage />} />
                  <Route path="/agents/:id/edit" element={<AgentsPage />} />
                </Route>
                
                {/* Events - accessible to all roles */}
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/add" element={<AddEventPage />} />
                <Route path="/events/upcoming" element={<EventsPage />} />
                <Route path="/events/past" element={<EventsPage />} />
                <Route path="/events/new" element={<AddEventPage />} />
                <Route path="/events/:id" element={<EventsPage />} />
                
                {/* Tasks - accessible to all roles */}
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/add" element={<AddTaskPage />} />
                
                {/* Team - admin can manage, all can view */}
                <Route path="/team" element={<TeamPage />} />
                <Route element={<ProtectedRoute allowedRoles={['honDNM', 'admin']} />}>
                  <Route path="/team/add" element={<AddTeamMemberPage />} />
                </Route>
                <Route path="/team/:id" element={<TeamPage />} />
                <Route element={<ProtectedRoute allowedRoles={['honDNM', 'admin']} />}>
                  <Route path="/team/:id/edit" element={<TeamPage />} />
                </Route>
                
                {/* Communication - accessible to all roles */}
                <Route path="/communication" element={<CommunicationPage />} />
                <Route path="/communication/messages/compose" element={<ComposeMessagePage />} />
                <Route path="/communication/messages" element={<CommunicationPage />} />
                <Route path="/communication/voicemail" element={<CommunicationPage />} />
                <Route path="/communication/calls" element={<CommunicationPage />} />
                
                {/* Analytics - admin and candidate only */}
                <Route element={<ProtectedRoute allowedRoles={['honDNM', 'admin']} />}>
                  <Route path="/analytics" element={<AnalyticsPage />} />
                </Route>
                
                {/* Account and settings - accessible to all */}
                <Route path="/account" element={<AccountPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
            
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
