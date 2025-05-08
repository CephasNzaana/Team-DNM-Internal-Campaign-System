
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
            : 'text-gray-300 hover:bg-green-800 hover:text-white'
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

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [votersOpen, setVotersOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-[#1A1F2C] text-white h-full w-64 overflow-y-auto py-6 hidden lg:block">
      <div className="px-4 mb-6">
        <h2 className="text-xl font-bold">DNM Campaign</h2>
        <p className="text-xs text-gray-400 mt-1">Kabale Municipality 2026</p>
      </div>
      
      <div className="space-y-1 px-2">
        <SidebarItem icon={<Home size={20} />} label="Dashboard" to="/" isActive={isActive('/')} />
        
        <SidebarItem 
          icon={<Users size={20} />} 
          label="Voters" 
          to="/voters"
          isActive={isActive('/voters') || location.pathname.startsWith('/voters/')} 
          hasSubmenu={true}
          isOpen={votersOpen}
          onClick={() => setVotersOpen(!votersOpen)}
        >
          <Link to="/voters" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
            All Voters
          </Link>
          <Link to="/voters/segments" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
            Segments
          </Link>
          <Link to="/voters/interactions" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
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
          <Link to="/events" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
            Calendar
          </Link>
          <Link to="/events/upcoming" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
            Upcoming
          </Link>
          <Link to="/events/past" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
            Past Events
          </Link>
        </SidebarItem>
        
        <SidebarItem icon={<CheckSquare size={20} />} label="Tasks" to="/tasks" isActive={isActive('/tasks')} />
        
        <SidebarItem 
          icon={<MessageSquare size={20} />} 
          label="Communication" 
          to="/communication"
          isActive={isActive('/communication') || location.pathname.startsWith('/communication/')} 
          hasSubmenu={true}
          isOpen={communicationOpen}
          onClick={() => setCommunicationOpen(!communicationOpen)}
        >
          <Link to="/communication/messages" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
            Messages
          </Link>
          <Link to="/communication/voicemail" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
            Voicemail
          </Link>
          <Link to="/communication/calls" className="block px-4 py-2 text-sm text-gray-300 hover:bg-green-800 hover:text-white rounded-md">
            Call Management
          </Link>
        </SidebarItem>
        
        <SidebarItem icon={<BarChart size={20} />} label="Analytics" to="/analytics" isActive={isActive('/analytics')} />
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <SidebarItem icon={<Settings size={20} />} label="Settings" to="/settings" isActive={isActive('/settings')} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
