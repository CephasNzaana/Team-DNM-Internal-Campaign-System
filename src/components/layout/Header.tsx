
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-[#306030] text-white py-2 px-4 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="lg:hidden mr-2 text-white hover:bg-green-700">
            <Menu />
          </Button>
          <div>
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl tracking-tight">Team DNM</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700">
            <Bell size={20} />
          </Button>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="flex items-center text-white hover:bg-green-700">
              <User size={20} className="mr-2" />
              <span className="hidden md:inline">Account</span>
              <ChevronDown size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
