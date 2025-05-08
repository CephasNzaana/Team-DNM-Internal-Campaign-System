
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { 
  Home, 
  Users, 
  Calendar, 
  CheckSquare, 
  MessageSquare, 
  BarChart, 
  Settings,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  isActive, 
  hasSubmenu, 
  isOpen,
  onClick,
  children 
}) => {
  return (
    <div className="mb-1">
      <Link 
        to={to} 
        className={`flex items-center px-4 py-2 text-sm rounded-md ${
          isActive 
            ? 'bg-green-700 text-white' 
            : 'text-gray-700 hover:bg-green-100'
        }`}
        onClick={onClick}
      >
        <div className="mr-3">{icon}</div>
        <span className="flex-1">{label}</span>
        {hasSubmenu && (
          <div className="ml-auto">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </Link>
      {hasSubmenu && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const MobileSidebar: React.FC = () => {
  const location = useLocation();
  const [votersOpen, setVotersOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <div className="flex flex-col h-full bg-white">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-green-800">DNM Campaign</h2>
            <p className="text-xs text-gray-500 mt-1">Kabale Municipality 2026</p>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4 px-2">
            <div className="space-y-1">
              <SidebarItem 
                icon={<Home size={20} />} 
                label="Dashboard" 
                to="/" 
                isActive={isActive('/')} 
                onClick={() => setIsOpen(false)}
              />
              
              <SidebarItem 
                icon={<Users size={20} />} 
                label="Voters" 
                to="/voters"
                isActive={isActive('/voters') || location.pathname.startsWith('/voters/')} 
                hasSubmenu={true}
                isOpen={votersOpen}
                onClick={() => setVotersOpen(!votersOpen)}
              >
                <Link to="/voters" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  All Voters
                </Link>
                <Link to="/voters/segments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  Segments
                </Link>
                <Link to="/voters/interactions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  Interactions
                </Link>
              </SidebarItem>
              
              <SidebarItem 
                icon={<Calendar size={20} />} 
                label="Events" 
                to="/events"
                isActive={isActive('/events') || location.pathname.startsWith('/events/')} 
                hasSubmenu={true}
                isOpen={eventsOpen}
                onClick={() => setEventsOpen(!eventsOpen)}
              >
                <Link to="/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  Calendar
                </Link>
                <Link to="/events/upcoming" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  Upcoming
                </Link>
                <Link to="/events/past" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  Past Events
                </Link>
              </SidebarItem>
              
              <SidebarItem icon={<CheckSquare size={20} />} label="Tasks" to="/tasks" isActive={isActive('/tasks')} onClick={() => setIsOpen(false)} />
              
              <SidebarItem 
                icon={<MessageSquare size={20} />} 
                label="Communication" 
                to="/communication"
                isActive={isActive('/communication') || location.pathname.startsWith('/communication/')} 
                hasSubmenu={true}
                isOpen={communicationOpen}
                onClick={() => setCommunicationOpen(!communicationOpen)}
              >
                <Link to="/communication/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  Messages
                </Link>
                <Link to="/communication/voicemail" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  Voicemail
                </Link>
                <Link to="/communication/calls" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 rounded-md" onClick={() => setIsOpen(false)}>
                  Call Management
                </Link>
              </SidebarItem>
              
              <SidebarItem icon={<BarChart size={20} />} label="Analytics" to="/analytics" isActive={isActive('/analytics')} onClick={() => setIsOpen(false)} />
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <SidebarItem icon={<Settings size={20} />} label="Settings" to="/settings" isActive={isActive('/settings')} onClick={() => setIsOpen(false)} />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
