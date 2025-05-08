
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DNM_THEME } from '@/lib/theme';

const Header: React.FC = () => {
  return (
    <header className="bg-[#306030] text-white py-3 px-4 md:px-6 shadow-md border-b border-[#4A5D23]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="lg:hidden mr-2 text-white hover:bg-green-700">
            <Menu />
          </Button>
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="flex flex-shrink-0 h-6 w-10 overflow-hidden">
                  <div className="h-full w-1/3 bg-black"></div>
                  <div className="h-full w-1/3 bg-[#FFCE00]"></div>
                  <div className="h-full w-1/3 bg-[#D90000]"></div>
                </div>
                <span className="font-bold text-xl tracking-tight">Team DNM</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-sm font-medium bg-[#4A5D23] text-white px-3 py-1 rounded-full">
            Kabale Municipality
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#D90000]"></span>
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
